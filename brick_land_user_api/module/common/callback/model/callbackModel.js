const mongoose = require("mongoose");

const callbackModel = mongoose.model(
  "callbacks",
  new mongoose.Schema(
    {
      userId: { type: mongoose.Types.ObjectId },
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      mobile: { type: String },
      comment: { type: String },

      status: {
        type: String,
        enum: ["PENDING", "RESOLVED"],
        default: "PENDING",
      },

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { callbackModel };
