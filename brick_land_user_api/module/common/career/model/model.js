const mongoose = require("mongoose");

const careerModel = mongoose.model(
  "career",
  new mongoose.Schema(
    {
      role: String,
      description: String,
      salary: String ,
      type: {
        type: String,
        enum: ["WFH", "OFFICE"],
        default: "OFFICE",
      },
      status:{
        type:Boolean
      },
      location:{
        type:String
      },
      link:{
        type:String
      },
      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { careerModel };
