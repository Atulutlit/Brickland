const mongoose = require("mongoose");

const testimonialModel = mongoose.model(
  "testimonials",
  new mongoose.Schema(
    {
      title: { type: String },
      description: { type: String },
      testimonialImg: { type: String },

      status: {
        type: String,
        enum: ["ACTIVE", "DEACTIVE"],
        default: "ACTIVE",
      },

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { testimonialModel };
