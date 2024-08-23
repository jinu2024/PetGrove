const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Initialize Razorpay instance using environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route to create Razorpay order 
router.post(
  '/razorpay',
  catchAsyncErrors(async (req, res, next) => {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Amount in smallest currency unit (e.g., paise for INR)
      currency: 'INR',
      receipt: 'receipt#1',
      payment_capture: 1, // Auto capture payment
    };

    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json({
        success: true,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  })
);

// Route to get Razorpay API key
router.get(
  '/razorpayapikey',
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ razorpayApikey: process.env.RAZORPAY_KEY_ID });
  })
);

module.exports = router;
