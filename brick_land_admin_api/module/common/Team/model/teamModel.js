const mongoose = require("mongoose");

const teamModel = mongoose.model(
  "teams",
  new mongoose.Schema(
    {
      name:String,
      position: String,
      img: String,
      message: { type: String },
      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { teamModel };
