const mongoose = require("mongoose");

const eventModel = mongoose.model(
  "events",
  new mongoose.Schema(
    {
      categoryId: { type: mongoose.Types.ObjectId, auto: true },
      title: { type: String },
      description: { type: String },
      location: { type: String },
      link :{type:String},
      eventDate:{type:String},
      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { eventModel };
