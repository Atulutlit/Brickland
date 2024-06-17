const mongoose = require("mongoose");

const blogsModel = mongoose.model(
  "blogs",
  mongoose.Schema(
    {
      blogsId: { type: mongoose.Types.ObjectId, auto: true },
      title: { type: String },
      description: { type: String },
      blogsImg: { type: String },

      status: {
        type: String,
        enum: ["ACTIVE", "DEACTIVE"],
        default: "ACTIVE",
      },

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }));

module.exports = { blogsModel };
