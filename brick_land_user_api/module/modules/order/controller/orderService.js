"use strict";
const { connection, Types } = require("mongoose");
const { cartModel } = require("../../cart/model/cartModel");
const { productModel } = require("../../product/model/productModel");
const { couponModel } = require("../../coupon/model/couponModel");

// For Check Amount Availble In Wallet Or Not For Purchage Product.
const checkPayment = async function (req, total) {
  const { _id } = req.decoded;
  const { paymentMethod } = req.body;
  if (paymentMethod == "online") {
  }
};

// For Clearing cart..
const clearCart = async function (req) {
  const { _id } = req.decoded;
  await cartModel.deleteOne({ userId: new Types.ObjectId(_id) });
};

const maintainSaleAfterOrder = async function (productData) {
  for (const product of productData) {
    await productModel.updateOne(
      { _id: new Types.ObjectId(product.productId) },
      {
        $inc: {
          totalSale: product.quantity || 0,
          stock: -product.quantity || 0,
        },
      }
    );
  }
};

module.exports = {
  checkPayment,
  clearCart,
  maintainSaleAfterOrder,
};
