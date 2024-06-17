const { model, Types, Schema } = require("mongoose");

const cartModel = model(
  "carts",
  new Schema(
    {
      userId: { type: Types.ObjectId },
      couponId: { type: Types.ObjectId },
      cart: [
        {
          productId: { type: Types.ObjectId },
          quantity: { type: Number },
        },
      ],

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { cartModel };
