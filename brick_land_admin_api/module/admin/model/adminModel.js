const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminModel = mongoose.model(
  "admins",
  new Schema(
    {
      roleId: { type: mongoose.Types.ObjectId },
      roleName: String,
      name: String,
      email: String,
      alternateMobile: String,
      password: String,
      adminType: {
        type: String,
        enum: ["SUPERADMIN", "SUBADMIN"],
        default: "SUBADMIN",
      },
      mobile: String,
      isLogin: { type: Boolean, default: false },
      profilePic: String,
      status: {
        type: String,
        enum: ["ACTIVE", "DEACTIVE"],
        default: "ACTIVE",
      },
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: Number,
      },

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { adminModel };
