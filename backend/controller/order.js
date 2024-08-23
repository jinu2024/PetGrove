const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../models/order");
const Shop = require("../models/shop");
const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");

// Create a new order
router.post( 
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    const shopItemsMap = new Map();
    cart.forEach(item => {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    });

    const orders = [];
    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json({ success: true, orders });
  })
);

// Get all orders of a user
router.get(
  "/get-all-orders/:userId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, orders });
  })
);

// Get all orders of a seller
router.get(
  "/get-seller-all-orders/:shopId",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ "cart.shopId": req.params.shopId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, orders });
  })
);

// Update order status
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this ID", 404));
    }

    if (req.body.status === "Transferred to delivery partner") {
      for (const item of order.cart) {
        await updateProductStock(item._id, item.quantity);
      }
    }

    order.status = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      const serviceCharge = order.totalPrice * 0.10;
      await updateSellerBalance(order.totalPrice - serviceCharge, order.cart[0].shopId);
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, order });

    async function updateProductStock(id, quantity) {
      const product = await Product.findById(id);
      product.stock -= quantity;
      product.sold_out += quantity;
      await product.save({ validateBeforeSave: false });
    }

    async function updateSellerBalance(amount, shopId) {
      const seller = await Shop.findById(shopId);
      seller.availableBalance += amount;
      await seller.save();
    }
  })
);

// Handle order refund request by user
router.put(
  "/order-refund/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this ID", 404));
    }

    order.status = req.body.status;
    await order.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, order, message: "Order refund request submitted successfully!" });
  })
);

// Accept the refund request by seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this ID", 404));
    }

    order.status = req.body.status;
    if (req.body.status === "Refund Success") {
      for (const item of order.cart) {
        await updateProductStock(item._id, item.quantity);
      }
    }

    await order.save();
    res.status(200).json({ success: true, message: "Order refund successful!" });

    async function updateProductStock(id, quantity) {
      const product = await Product.findById(id);
      product.stock += quantity;
      product.sold_out -= quantity;
      await product.save({ validateBeforeSave: false });
    }
  })
);

// Get all orders for admin
// router.get(
//   "/admin-all-orders",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     const orders = await Order.find().sort({ deliveredAt: -1, createdAt: -1 });
//     res.status(200).json({ success: true, orders });
//   })
// );

module.exports = router;
