const express = require("express");
const router = express.Router();
const Shop = require("../models/shop");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require('../middleware/auth');
const CouponCode = require("../models/couponCode");

// Create CouponCode
router.post('/create-coupon-code', isSeller, catchAsyncErrors(async (req, res, next) => {
    try {
        const couponCodeExist = await CouponCode.findOne({ name: req.body.name });

        if (couponCodeExist) {
            return next(new ErrorHandler("Coupon code already exists", 400));
        }

        const couponCode = await CouponCode.create(req.body);
        res.status(201).json({
            success: true,
            couponCode,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}));

// get all coupons of a shop
router.get(
    "/get-coupon/:id",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const couponCodes = await CouponCode.find({ shopId: req.seller.id });
        res.status(201).json({
          success: true,
          couponCodes,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    }));

// get coupon value by the name

router.get('/get-coupon-value/:name', catchAsyncErrors(async(req, res, next)=>{
  try{
    const couponCode = await CouponCode.findOne({name: req.params.name});

    res.status(200).json({
      success: true,
      couponCode,
    })
  } catch(error){
    return next(new ErrorHandler(error, 400));
  }
}))

module.exports = router;
