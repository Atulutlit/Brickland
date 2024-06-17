"use strict";
const { connection, Types } = require("mongoose");
const moment = require("moment");
const { cartModel } = require("../model/cartModel");
const { productModel } = require("../../product/model/productModel");
const { couponModel } = require("../../coupon/model/couponModel");

const addProductToCart = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const { productId, quantity } = req.body;
    const findProduct = await productModel
      .findOne({
        _id: new Types.ObjectId(productId),
        status: "ACTIVE",
        // state: 'APPROVED',
      })
      .lean();
    if (!findProduct) {
      return res.json({
        meta: { msg: "Product not found.", status: false },
      });
    } else if (!findProduct.stock) {
      return res.json({
        meta: { msg: "Product out of stock", status: false },
      });
    } else if (findProduct.stock < quantity) {
      return res.json({
        meta: { msg: "Maximum quantity added. can't add more", status: false },
      });
    }

    const findCart = await cartModel.findOne({
      userId: new Types.ObjectId(_id),
    });
    if (findCart) {
      const findQuery = {
        userId: new Types.ObjectId(_id),
        "cart.productId": new Types.ObjectId(productId),
      };
      const updateCartData = await cartModel.findOneAndUpdate(findQuery, {
        $inc: { "cart.$.quantity": Number(quantity) },
        // $set: { "cart.$.quantity": Number(quantity) },
      });
      if (updateCartData) {
        return res.json({
          meta: {
            msg: "Product quantity updated to cart successfully.",
            status: true,
          },
        });
      } else {
        await cartModel.findOneAndUpdate(
          { userId: new Types.ObjectId(_id) },
          { $push: { cart: { productId, quantity } } }
        );
        return res.json({
          meta: { msg: "Product added to cart successfully", status: true },
        });
      }
    } else {
      const addCartObj = {
        userId: _id,
        cart: [
          {
            productId,
            quantity,
          },
        ],
      };
      const addcartData = await cartModel.create(addCartObj);
      if (addcartData) {
        return res.json({
          meta: { msg: "Product added to cart", status: true },
        });
      } else {
        return res.json({
          meta: { msg: "Something went wrong.", status: false },
        });
      }
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const increaseProductQuantity = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const { productId, quantity } = req.body;
    const findProduct = await productModel
      .findOne({
        _id: new Types.ObjectId(productId),
        status: "ACTIVE",
        // state: 'APPROVED',
      })
      .lean();
    if (!findProduct) {
      return res.json({
        meta: { msg: "Product not found.", status: false },
      });
    } else if (!findProduct.stock) {
      return res.json({
        meta: { msg: "Product out of stock", status: false },
      });
    } else if (findProduct.stock < quantity) {
      return res.json({
        meta: { msg: "Maximim quantity added. can't add more", status: false },
      });
    }
    const findCart = await cartModel.findOne({
      userId: new Types.ObjectId(_id),
    });
    if (findCart) {
      const findQuery = {
        userId: new Types.ObjectId(_id),
        "cart.productId": new Types.ObjectId(productId),
      };
      const updateCartData = await cartModel.findOneAndUpdate(findQuery, {
        $inc: { "cart.$.quantity": Number(quantity) },
      });
      if (updateCartData) {
        return res.json({
          meta: {
            msg: "Product quantity updated to cart successfully.",
            status: true,
          },
        });
      } else {
        await cartModel.findOneAndUpdate(
          { userId: new Types.ObjectId(userId) },
          {
            $push: {
              productId,
              quantity,
            },
          }
        );
        return res.json({
          meta: { msg: "Product added to cart successfully", status: true },
        });
      }
    } else {
      return res.json({
        meta: {
          msg: "This product is from different shop. first clear cart.",
          status: true,
        },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const decreaseProductQuantity = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const { productId, quantity } = req.body;
    const findProduct = await productModel
      .findOne({
        _id: new Types.ObjectId(productId),
        status: "ACTIVE",
        // state: 'APPROVED',
      })
      .lean();
    if (!findProduct) {
      return res.json({
        meta: { msg: "Product not found.", status: false },
      });
    } else if (findProduct.stock < quantity) {
      return res.json({
        meta: { msg: "Maximim quantity added. can't add more", status: false },
      });
    }
    const findCart = await cartModel.findOne({
      userId: new Types.ObjectId(_id),
    });
    if (findCart) {
      const findQuery = {
        userId: new Types.ObjectId(_id),
        "cart.productId": new Types.ObjectId(productId),
      };
      const updateCartData = await cartModel.findOneAndUpdate(findQuery, {
        $inc: { "cart.$.quantity": -Number(quantity) },
      });
      if (updateCartData) {
        return res.json({
          meta: {
            msg: "Product quantity updated to cart successfully.",
            status: true,
          },
        });
      } else {
        return res.json({
          meta: { msg: "Something went wrong.", status: false },
        });
      }
    } else {
      return res.json({
        meta: { msg: "cart not found.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const removeProductFromCart = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const { productId } = req.params;
    const deleteData = await cartModel.findOneAndUpdate(
      { userId: new Types.ObjectId(_id) },
      {
        $pull: { cart: { productId: new Types.ObjectId(productId) } },
      }
    );
    if (deleteData) {
      const findCart = await cartModel.findOne({
        userId: new Types.ObjectId(_id),
      });
      if (!findCart.cart.length) {
        await cartModel.deleteOne({ userId: new Types.ObjectId(_id) });
      }
      return res.json({
        meta: { msg: "Product successfully removed from cart.", status: true },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const cartList = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const cartData = await cartModel.aggregate(getCartPipeline(_id));
    if (cartData && cartData.length) {
      const { total, subTotal, discount, deliveryCharges } = await prepareTotal(
        cartData
      );

      return res.json({
        meta: { msg: "Cart data found successfully", status: true },
        data: cartData,
        total,
        subTotal,
        discount,
        deliveryCharges,
      });
    } else {
      return res.json({
        meta: { msg: "Cart not found", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const prepareTotal = async function (cartData) {
  let total = 0;
  let subTotal = 0;
  let discount = 0;
  let deliveryCharges = 0;

  cartData.forEach((_) => {
    subTotal += _.quantity * _.product.specialPrice;
  });
  if (subTotal !== 0) {
    total = subTotal;
  }

  if (cartData && cartData.length && cartData[0].coupon) {
    if (cartData[0].coupon.type == "PERCENTAGE") {
      discount = (subTotal * cartData[0].coupon.discount) / 100;
      if (discount <= cartData[0].coupon.maxDiscount) {
        total = subTotal - discount;
      } else {
        total = subTotal - cartData[0].coupon.maxDiscount;
        discount = cartData[0].coupon.maxDiscount;
      }
    }
    if (cartData[0].coupon.type == "ABSOLUTE") {
      discount = cartData[0].coupon.discount;
      if (discount <= cartData[0].coupon.maxDiscount) {
        total = subTotal - discount;
      } else {
        total = subTotal - cartData[0].coupon.maxDiscount;
        discount = cartData[0].coupon.maxDiscount;
      }
    }
  }

  if (cartData && deliveryCharges) {
    total += deliveryCharges;
  } else {
    deliveryCharges = 0;
  }

  return {
    total: Number(total.toFixed(2)),
    subTotal: Number(subTotal.toFixed(2)),
    discount,
    deliveryCharges,
  };
};

const getCartPipeline = function (userId) {
  return [
    {
      $match: {
        userId: new Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "coupons",
        localField: "couponId",
        foreignField: "_id",
        as: "coupon",
      },
    },
    {
      $unwind: {
        path: "$coupon",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$cart",
        includeArrayIndex: "index",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        productId: "$cart.productId",
        quantity: "$cart.quantity",
        createdAt: 1,
        updatedAt: 1,
        index: 1,
        couponId: 1,
        coupon: 1,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        pipeline: [
          {
            $lookup: {
              from: "categories",
              localField: "categoryId",
              foreignField: "_id",
              as: "category",
            },
          },
          {
            $unwind: {
              path: "$category",
              preserveNullAndEmptyArrays: true,
            },
          },
        ],
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: false,
      },
    },
  ];
};

const applyCouponInCart = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const { code } = req.body;
    const findCouponCode = await couponModel.findOne({
      code: code.toLowerCase(),
      status: "ACTIVE",
      startDate: { $lte: moment().valueOf() },
      endDate: { $gte: moment().valueOf() },
    });

    if (findCouponCode) {
      if (findCouponCode.useCount <= 0) {
        return res.json({
          meta: {
            msg: `You have used this coupon, so can't be applied.`,
            status: false,
          },
        });
      }
      const findCartCoupon = await cartModel.findOne({
        couponId: new Types.ObjectId(findCouponCode._id),
      });
      if (findCartCoupon) {
        return res.json({
          meta: { msg: `Coupon is already applied.`, status: false },
        });
      }
      const cartData = await cartModel.aggregate(getCartPipeline(_id));
      if (cartData && cartData.length) {
        const { total } = await prepareTotal(cartData);
        if (cartData.length < findCouponCode.maxOrderItems) {
          return res.json({
            meta: {
              msg: `Minimum order items should be ${findCouponCode.maxOrderItems}.`,
              status: false,
            },
          });
        }
        if (total < findCouponCode.minOrderAmount) {
          return res.json({
            meta: {
              msg: `Minimum order amount should be ${findCouponCode.minOrderAmount}.`,
              status: false,
            },
          });
        }
        if (total > findCouponCode.maxOrderAmount) {
          return res.json({
            meta: {
              msg: `maximum order amount should be ${findCouponCode.maxOrderAmount}.`,
              status: false,
            },
          });
        }
      } else {
        return res.json({
          meta: { msg: `Cart not found.`, status: false },
        });
      }
      const findCartCouponQuery = {
        userId: new Types.ObjectId(_id),
      };
      const updateCouponCart = await cartModel.findOneAndUpdate(
        findCartCouponQuery,
        {
          $set: {
            couponId: new Types.ObjectId(findCouponCode._id),
          },
        }
      );
      if (updateCouponCart) {
        return res.json({
          meta: { msg: "Coupon applied successfully .", status: true },
        });
      } else {
        return res.json({
          meta: { msg: "Something went wrong.", status: false },
        });
      }
    } else {
      return res.json({
        meta: { msg: "Invalid coupon code.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const removeCouponInCart = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const removePromocode = await cartModel.updateOne(
      { userId: new Types.ObjectId(_id) },
      { $unset: { couponId: 1 } }
    );
    if (removePromocode.modifiedCount > 0) {
      return res.json({
        meta: { msg: "Coupon successfully removed from cart", status: true },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  addProductToCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProductFromCart,
  cartList,
  applyCouponInCart,
  removeCouponInCart,
  prepareTotal,
  getCartPipeline,
};
