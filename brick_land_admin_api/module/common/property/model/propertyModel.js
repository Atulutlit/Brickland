const mongoose = require("mongoose");

const propertyModel = mongoose.model(
  "properties",
  new mongoose.Schema(
    {
      propertyId: { type: String, index: true, unique: true, required: true },
      url: { type: String, required: true },
      propertyName: { type: String, required: true },
      propertyImg: { type: String, required: true },
      propertyType: { type: String, required: true },
      description: { type: String, required: true },
      shortDescription: { type: String, required: true },
      price: { type: Number, required: true },
      specialPrice: { type: Number },
      features: { type: [String] },
      isBestSeller: { type: Boolean, default: false },
      bedrooms: { type: Number, required: true },
      bathrooms: { type: Number, required: true },
      kitchen: { type: Number, required: true },
      parking: { type: Number, required: true },
      address: { type: String, required: true },
      area: { type: String, required: true },
      isFurnished: { type: Boolean, default: false },
      accommodation: { type: String, required: true },
      status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
      state: { type: String, enum: ["APPROVED", "PENDING", "REJECTED"], default: "APPROVED" },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  )
);

module.exports = { propertyModel };
