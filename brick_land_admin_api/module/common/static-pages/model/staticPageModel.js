const mongoose = require("mongoose");

const staticPageModel = mongoose.model(
  "static-pages",
  new mongoose.Schema(
    {
      title: { type: String },
      url: { type: String },
      description: { type: String },
      pageImg: { type: String },

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

module.exports = { staticPageModel };
