const mongoose = require("mongoose");

const counterModel = mongoose.model(
  "counters",
  mongoose.Schema(
    {
      counterId: { type: mongoose.Types.ObjectId, auto: true },
      name: { type: String, unique: true },
      seq: { type: Number, default: 0 },
      primeIndex: { type: Number, default: 0 },


      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }));

module.exports = { counterModel };
