const mongoose = require("mongoose");

const reviewModel = mongoose.model("reviews",
    new mongoose.Schema({
        reviewId: { type: mongoose.Types.ObjectId, auto: true },
        productId: { type: mongoose.Types.ObjectId },
        productData: {},
        shopId: { type: mongoose.Types.ObjectId },
        shopData: {},
        userId: { type: mongoose.Types.ObjectId },
        userData: {},

        rating: { type: Number, default: 0 },
        review: { type: String },

        type: {
            type: String,
            enum: ["SHOP", "USER", "PRODUCT"]
        },
        status: {
            type: String,
            default: "PENDING",
            enum: ["PENDING", "APPROVED", "CANCELLED"]
        },

        createdAt: Number,
        updatedAt: Number
    }, { timestamps: true }));

module.exports = { reviewModel };