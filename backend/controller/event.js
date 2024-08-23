const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const Shop = require("../models/shop");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Event = require("../models/event");
const {isSeller} = require('../middleware/auth');
const fs = require('fs');

// Create Event

router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;

      // Find the shop based on shopId
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop not found!", 404));
      } else {
        // Extract file names from uploaded images
        const imageUrls = req.files.map((file) => file.filename);

        // Create a new product object
        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        const event = await Event.create(eventData);
        // Send success response
        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      // Handle errors
      next(new ErrorHandler(error.message, 400));
    }
  })
);

//Get events

router.get('/get-all-events/:id', catchAsyncErrors(async(req,res,next)=>{
  try{
      const events = await Event.find({shopId: req.params.id});

      res.status(201).json({
          sucess: true,
          events,
      });
  } catch(error){
      return next(new ErrorHandler(error, 400))
  }
}));


// Get all events

router.get('/get-all-events', async(req, res, next)=>{
  try{
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    })
  } catch (error){
    return next(new ErrorHandler(error, 400));
  }
})


// Delete Event

router.delete('/delete-shop-event/:id',isSeller, catchAsyncErrors(async(req,res,next)=>{
  try{
      const eventId = req.params.id;
      const eventData = await Event.findById(eventId);

      eventData.images.forEach((imageUrl) => {
          const filename = imageUrl;
          const filePath = `uploads/${filename}`;

          fs.unlink(filePath, (err)=>{
              if(err){
                  console.log(err);
              }
          });
      });
      const event = await Event.findByIdAndDelete(eventId);

      if(!event){
          return next(new ErrorHandler("Event not found with this id!", 500))
      }

      res.status(201).json({
          success: true,
          event,
      })

  } catch(error){
      return next(new ErrorHandler(error, 400))
  }
}))

module.exports = router;
