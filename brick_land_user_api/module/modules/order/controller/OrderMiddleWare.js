"use strict";
const { Types } = require("mongoose");
const { cartModel } = require("../../cart/model/cartModel");
const { couponModel } = require("../../coupon/model/couponModel");

// middleWare function...
const checkValidOrder = async function (req, res, next) {
  try {
    const { _id } = req.decoded;
    const cartData = await cartModel
      .findOne({ userId: new Types.ObjectId(_id) })
      .lean();
    if (cartData && cartData.cart.length) {
      if (cartData && cartData.couponId) {
        await checkCouponCodeIsValid(cartData.couponId, req);
      } else {
        req.couponData = {};
      }
      req.cartData = cartData;
      next();
    } else {
      return res.json({
        meta: {
          msg: "No Product found in your cart. \nPlease add products in your cart.",
          status: false,
        },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

// For check coupon code is Valid Or Not..
const checkCouponCodeIsValid = async function (couponId, req) {
  const findCouponCode = await couponModel
    .findOne({
      _id: new Types.ObjectId(couponId),
      // expiryDate: { $gte: moment().valueOf() }
    })
    .lean();
  if (!findCouponCode) {
    throw new Error("Sorry invalid coupon.");
  } else {
    req.couponData = findCouponCode;
  }
};

module.exports = { checkValidOrder };
