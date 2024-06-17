const mongoose = require("mongoose");

const couponModel = mongoose.model(
  "coupons",
  new mongoose.Schema(
    {
      couponId: { type: String, index: true, uppercase: true, required: true },
      name: { type: String, index: true, lowercase: true, required: true },
      code: { type: String, index: true, lowercase: true, required: true },
      description: { type: String, index: true, lowercase: true },
      conditions: { type: String, index: true, lowercase: true },
      type: {
        type: String,
        enum: ["ABSOLUTE", "PERCENTAGE"],
        default: "ABSOLUTE",
        required: true,
      },
      discount: { type: Number, default: 0 },
      maxDiscount: { type: Number, default: 0 },
      minOrderAmount: { type: Number, default: 0 },
      maxOrderAmount: { type: Number, default: 0 },
      maxOrderItems: { type: Number, default: 0 },
      startDate: { type: Number, default: 0 },
      endDate: { type: Number, default: 0 },
      useCount: { type: Number, default: 0 },

      status: { type: String, enum: ["ACTIVE", "DEACTIVE"], default: "ACTIVE" },

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { couponModel };
