const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../models/user");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMailer");
const sendToken = require("../utils/jwtToken");
const {isAuthenticated}  = require("../middleware/auth");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      // Delete uploaded file if user already exists
      const filename = req.file.filename;
      const filepath = `uploads/${filename}`;
      fs.unlink(filepath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `${process.env.FRONTEND}/activation/${activationToken}`;


    // Send activation email
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email (${user.email}) to activate your account`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "1d", // token expires in 1 day
  });
};

// Activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar } = newUser;
      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({ name, email, avatar, password });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user

router.post("/login-user", catchAsyncErrors(async(req,res,next)=>{
  try{
    const {email, password} = req.body;

    if(!email || !password){
      return next(new ErrorHandler("Please fill all the required fields!!", 400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid){
      return next(new ErrorHandler("Incorrect credentials!", 400));
    }

    sendToken(user, 201, res);
    console.log("User login successful!")
  } catch(error){

  }
}));

//Google-Login


router.post(
  "/google-login",
  catchAsyncErrors(async (req, res, next) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, name, email, picture } = ticket.getPayload();

    if (!email_verified) {
      return next(new ErrorHandler("Google login failed. Please try again later.", 400));
    }

    const user = await User.findOne({ email });

    if (user) {
      sendToken(user, 201, res);
    } else {
      const password = email + process.env.GOOGLE_SECRET;

      const newUser = new User({
        name,
        email,
        password,
        avatar: picture,
      });

      await newUser.save();
      sendToken(newUser, 201, res);
    }
  })
);

// LogOut User

router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//user update information route

router.put('/update-user-info', isAuthenticated, catchAsyncErrors(async(req, res, next)=>{
  try{
    const {email, password, phoneNumber, name} = req.body;
    const user = await User.findOne({email}).select("+password");

    if(!user){
      return next(new ErrorHandler('User not found', 400));
    }

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid){
      return next(
        new ErrorHandler('Please provide the correct information', 400)
      );
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(201).json({
      sucess: true,
      user,
    })

  } catch(error){
    return next(new ErrorHandler(error.message, 500))
  }
}))

// Update user avatar

router.put('/update-avatar', isAuthenticated, upload.single("image"), catchAsyncErrors(async (req, res, next) => {
  try {
      const userId = req.user.id;
      const existUser = await User.findById(userId);

      if (!existUser) {
          return next(new ErrorHandler('User not found', 404));
      }

      if (existUser.avatar) {
          const existAvatarPath = path.join(__dirname, '..', 'uploads', existUser.avatar);

          if (fs.existsSync(existAvatarPath)) {
              fs.unlinkSync(existAvatarPath);
          }
      }

      if (!req.file) {
          return next(new ErrorHandler('No file uploaded', 400));
      }

      const fileUrl = req.file.filename;

      const user = await User.findByIdAndUpdate(userId, { avatar: fileUrl }, { new: true });

      res.status(200).json({
          success: true,
          user,
      });

  } catch (error) {
      return next(new ErrorHandler(error.message, 500));
  }
}));


router.put("/update-user-addresses", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    // Check for duplicate address type
    const duplicateAddressType = user.addresses.find(address => address.addressType === req.body.addressType);

    if (duplicateAddressType) {
      return next(new ErrorHandler(`${req.body.addressType} address already exists`, 400));
    }

    // Find the existing address by _id
    const existingAddress = user.addresses.find(address => address._id == req.body._id);
    if (existingAddress) {
      // Update the existing address
      Object.assign(existingAddress, req.body);
    } else {
      // Add the new address
      user.addresses.push(req.body);
    }

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

//delete user address

router.delete('/delete-user-address/:id', isAuthenticated, catchAsyncErrors(async (req, res, next)=>{
  try{
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne({
        _id: userId,
      },
    {
      $pull: {addresses: {_id: addressId}}
    }
  );

  const user = await User.findById(userId);

  res.status(200).json({
    success: true,
    user,
  })

  }catch(error){
    return next(new ErrorHandler(error.message, 500));
  }
}))

// Update user password

router.put('/update-user-password', isAuthenticated, catchAsyncErrors(async (req, res, next)=>{
  try{
    const user = await User.findById(req.user.id).select('+password');
    const isPasswordCorrect = await user.comparePassword(req.body.currentPassword);

    if(!isPasswordCorrect){
      return next(new ErrorHandler("Current password is incorrect", 400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
      return next(new ErrorHandler("Password doesn't match", 400));
    }


    user.password = req.body.newPassword;

    await user.save();
    res.status(200).json({
      success: true,
      message: 'Password Updated Succesfully',
    })
  }catch (error){
    return next(new ErrorHandler(error.message, 500));
  }
}))
module.exports = router;
