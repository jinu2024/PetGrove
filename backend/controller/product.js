const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Shop = require('../models/shop');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const { upload } = require('../multer');
const { isSeller } = require('../middleware/auth');
const fs = require('fs');

router.post("/create-product", upload.array("images"), catchAsyncErrors(async (req, res, next) => {
    try {
        const { shopId, shop, name, description, category, tags, originalPrice, discountPrice, stock } = req.body;

        // Validate required fields
        if (!shopId || !shop || !name || !description || !category || !tags || !originalPrice || !discountPrice || !stock) {
            return next(new ErrorHandler('All fields are required!', 400));
        }

        // Extract file names from uploaded images
        const imageUrls = req.files.map(file => file.filename);

        // Create a new product object
        const product = await Product.create({
            name,
            description,
            category,
            tags,
            originalPrice,
            discountPrice,
            stock,
            images: imageUrls,
            shopId,
            shop, 
        });

        // Send success response
        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        // Handle errors
        next(new ErrorHandler(error.message, 400));
    }
}));



//Get all Products of a shop


router.get('/get-all-products-shop/:id', catchAsyncErrors(async(req,res,next)=>{
    try{
        const products = await Product.find({shopId: req.params.id});

        res.status(201).json({
            sucess: true,
            products,
        });
    } catch(error){
        return next(new ErrorHandler(error, 400))
    }
}));

// Get all products
router.get(
    "/get-all-products",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const products = await Product.find().sort({ createdAt: -1 });
  
        res.status(201).json({
          success: true,
          products,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

// Delete Product of a Shop

router.delete('/delete-shop-product/:id',isSeller, catchAsyncErrors(async(req,res,next)=>{
    try{
        const productId = req.params.id;
        const productData = await Product.findById(productId);

        productData.images.forEach((imageUrl) => {
            const filename = imageUrl;
            const filePath = `uploads/${filename}`;

            fs.unlink(filePath, (err)=>{
                if(err){
                    console.log(err);
                }
            });
        });

        const product = await Product.findByIdAndDelete(productId);

        if(!product){
            return next(new ErrorHandler("Product not found with this id!", 500))
        }

        res.status(201).json({
            success: true,
            product,
        })

    } catch(error){
        return next(new ErrorHandler(error, 400))
    }
}))
module.exports = router;
