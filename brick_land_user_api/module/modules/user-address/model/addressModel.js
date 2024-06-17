const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    addressId: String,
    userId: { type: mongoose.Types.ObjectId },
    addressType: {
      type: String,
      enum: ["HOME", "OFFICE", "OTHER"],
      default: "HOME",
    },
    name: String,
    pincode: String,
    addressLine1: String,
    addressLine2: String,
    mappedPort: { type: String, default: "" },
    cityName: { type: String },
    stateName: { type: String },
    countryName: { type: String },
    isDefault: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE"],
      default: "ACTIVE",
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true }
);

const userAddressModel = mongoose.model("userAddresses", addressSchema);
module.exports = { userAddressModel };
