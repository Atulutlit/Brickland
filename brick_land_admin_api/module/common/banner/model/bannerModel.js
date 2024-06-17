const mongoose = require("mongoose");

const bannerModel = mongoose.model(
  "banners",
  new mongoose.Schema(
    {
      title: String,
      description: String,
      bannerImg: { type: String },

      type: {
        type: String,
        enum: ["NORMAL", "OFFER"],
        default: "NORMAL",
      },

      status: {
        type: String,
        enum: ["ACTIVE", "DEACTIVE"],
        default: "ACTIVE",
      },

      isDefault: { type: Boolean, default: false },

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { bannerModel };
