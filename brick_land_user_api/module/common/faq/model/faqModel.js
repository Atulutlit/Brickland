const mongoose = require("mongoose");

const faqModel = mongoose.model("faqs", mongoose.Schema({
    faqId: { type: mongoose.Types.ObjectId, auto: true },
    question: String,
    answer: String,
    faqPageId: String,
    faqPageTitle: String,

    status: { type: String, enum: ["ACTIVE", "DEACTIVE"], default: "ACTIVE" },
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true }));

module.exports = { faqModel };