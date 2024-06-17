const mongoose = require("mongoose");

const faqModel = mongoose.model(
  "faqs",
  new mongoose.Schema(
    {
      question: { type: String, index: true, lowercase: true },
      answer: { type: String, index: true, lowercase: true },

      status: { type: String, enum: ["ACTIVE", "DEACTIVE"], default: "ACTIVE" },

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { faqModel };
