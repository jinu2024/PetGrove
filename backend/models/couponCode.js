const mongoose = require('mongoose');

const coupounCodeSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, "Please enter your coupounCode product name"],
        unique: true,
    },

    value: {
        type: Number,
        required: true,
    },

    minAmount: {
        type: Number,
    },

    maxAmount: {
        type: Number,
    },

    shopId:{
        type: String,
        required: true,
    },
    selectedProduct:{
        type: String,
    },

    createdAt:{
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("CouponCode", coupounCodeSchema);
