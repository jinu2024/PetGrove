const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Shop = require("../models/shop");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const fs = require("fs");
const Order = require("../models/order");

router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        shopId,
        shop,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
      } = req.body;

      // Validate required fields
      if (
        !shopId ||
        !shop ||
        !name ||
        !description ||
        !category ||
        !tags ||
        !originalPrice ||
        !discountPrice ||
        !stock
      ) {
        return next(new ErrorHandler("All fields are required!", 400));
      }

      // Extract file names from uploaded images
      const imageUrls = req.files.map((file) => file.filename);

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
        product,
      });
    } catch (error) {
      // Handle errors
      next(new ErrorHandler(error.message, 400));
    }
  })
);

//Get all Products of a shop

router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        sucess: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

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

router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Product Review

router.put(
    "/create-new-review",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { user, rating, comment, productId, orderId } = req.body;
  
        const product = await Product.findById(productId);
  
        // If product is not found, return 404
        if (!product) {
          return res.status(404).json({
            success: false,
            message: "Product not found",
          });
        }
  
        // Prepare the review object
        const review = {
          user,
          rating,
          comment,
          productId,
        };
  
        // Check if the product has already been reviewed by the user
        const isReviewed = product.reviews.find(
          (rev) => rev.user._id.toString() === user._id.toString() // Compare user ID
        );
  
        if (isReviewed) {
          // Update the existing review
          product.reviews.forEach((rev) => {
            if (rev.user._id.toString() === user._id.toString()) {
              rev.rating = rating;
              rev.comment = comment;
              rev.user = user; // Update user details
            }
          });
        } else {
          // Add new review
          product.reviews.push(review);
        }
  
        // Update the average rating
        let avg = 0;
        product.reviews.forEach((rev) => {
          avg += rev.rating;
        });
        product.ratings = avg / product.reviews.length;
  
        // Save the product with new/updated review
        await product.save({ validateBeforeSave: false });
  
        // Update the order status to mark the product as reviewed
        await Order.findByIdAndUpdate(
          orderId,
          { $set: { "cart.$[elem].isReviewed": true } },
          { arrayFilters: [{ "elem._id": productId }], new: true }
        );
  
        res.status(200).json({
          success: true,
          message: "Reviewed successfully!",
        });
      } catch (error) {
        console.error(error);
        return next(new ErrorHandler(error.message, 400));
      }
    })
  );
  
module.exports = router;
