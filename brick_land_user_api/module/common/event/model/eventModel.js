const mongoose = require("mongoose");

const eventModel = mongoose.model(
  "events",
  new mongoose.Schema(
    {
      title: { type: String ,required:true},
      description: { type: String ,required:true },
      location: { type: String ,required:true },
      link :{type:[String],required:true},
      eventDate:{type:String,required:true},
      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { eventModel };
