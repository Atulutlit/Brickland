const mongoose = require("mongoose");

const orderModel = mongoose.model(
  "orders",
  new mongoose.Schema(
    {
      orderId: String,
      userId: { type: mongoose.Types.ObjectId },
      subTotal: Number,
      total: Number,
      deliveryCharge: Number,
      paymentMethod: {
        type: String,
        enum: ["NA", "ONLINE", "POD"],
        default: "NA",
      },
      couponId: { type: mongoose.Types.ObjectId },
      discount: Number,
      orderStatus: { type: Number, default: 1, enum: [1, 2, 3, 4, 5, 6] },
      /*
       1. PENDING
       2. ACCEPTED
       3. PACKED
       4. SHIPPED
       5. DELIVERED
       6. A_CANCELLED
       7. C_CANCELLED
      */
      paymentDetails: {},
      productDetails: [],
      addressId: { type: mongoose.Types.ObjectId },
      shippingAddress: {},

      acceptedDate: Number,
      rejectDate: Number,
      packedDate: Number,
      shippedDate: Number,
      deliveredDate: Number,
      a_cancelledDate: Number,
      c_cancelledDate: Number,

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { orderModel };
