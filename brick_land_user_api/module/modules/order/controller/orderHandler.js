"use strict";
const { Types } = require("mongoose");
const { orderModel } = require("../model/orderModel");
const { userAddressModel } = require("../../user-address/model/addressModel");
const {
  checkPayment,
  clearCart,
  maintainSaleAfterOrder,
} = require("./orderService");
const {
  getCustomOrderId,
} = require("../../../common/counter/controller/counterHandler");
const {
  getCartPipeline,
  prepareTotal,
} = require("../../cart/controller/cartHandler");
const { cartModel } = require("../../cart/model/cartModel");
const { couponModel } = require("../../coupon/model/couponModel");

const orderPlace = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const { couponData } = req;
    const { addressId, paymentMethod } = req.body;
    let shippingAddress = await userAddressModel
      .findOne({ _id: new Types.ObjectId(addressId)() })
      .lean();
    if (!shippingAddress) {
      return res.json({
        meta: { msg: "Address not found.", status: false },
      });
    }
    const cartData = await cartModel.aggregate(getCartPipeline(_id));
    if (cartData && cartData.length) {
      const { total, subTotal, discount, deliveryCharges } = await prepareTotal(
        cartData
      );
      const orderId = await getCustomOrderId();
      const orderObj = {
        orderId,
        userId: _id,
        addressId,
        shippingAddress,
        productDetails: cartData,
        total,
        subTotal,
        discount,
        ...(couponData && {
          couponId: couponData._id,
        }),
        deliveryCharges,
        paymentMethod,
      };
      const orderData = await orderModel.create(orderObj);
      if (orderData) {
        await couponModel.updateOne(
          { _id: new Types.ObjectId(couponData._id)() },
          { $inc: { useCount: -1 } }
        );
        await clearCart(req);
        await maintainSaleAfterOrder(cartData);
        return res.json({
          meta: { msg: "Order placed successfully", status: true },
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

const orderList = async function (req, res) {
  try {
    const { _id } = req.decoded;
    const { status, searchKey, startDate, endDate, categoryId } = req.query;
    const contentPerPage = Number(req.query.contentPerPage || 0);
    const page = Number(req.query.page || 0);
    const elematchQuery = {
      ...(categoryId &&
        categoryId !== "undefined" && {
          "product.categoryId": new Types.ObjectId(categoryId),
        }),
      ...(productId &&
        productId !== "undefined" && {
          productId: new Types.ObjectId(productId),
        }),
    };
    const findQuery = {
      ...(Object.keys(elematchQuery).length !== 0 && {
        productDetails: {
          $elemMatch: elematchQuery,
        },
      }),
      userId: new Types.ObjectId(_id),
      ...(status && { orderStatus: status }),
      ...(searchKey && {
        $or: [
          { orderId: { $regex: `${searchKey}.*`, $options: "i" } },
          { paymentMethod: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
      ...(startDate &&
        endDate && {
          createdAt: {
            $gte: Number(startDate),
            $lte: Number(endDate),
          },
        }),
    };
    const orderListData = await orderModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .skip(contentPerPage * page - contentPerPage)
      .limit(contentPerPage)
      .select();
    if (orderListData.length) {
      const total = await orderModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "Order list successfully found", status: true },
        data: orderListData,
        ...(contentPerPage && {
          pages: Math.ceil(total / contentPerPage),
          total,
        }),
      });
    } else {
      return res.json({
        meta: { msg: "List not found.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const orderDetails = async function (req, res) {
  try {
    const { _id: userId } = req.decoded;
    const { orderId } = req.params;
    if (!orderId) {
      return res.json({
        meta: { msg: "Parameters missing", status: false },
      });
    }
    const findQuery = {
      userId,
      _id: orderId,
    };
    const orderDetailsData = await orderModel.findOne(findQuery);
    if (orderDetailsData) {
      return res.json({
        meta: { msg: "Order  details successfully found", status: true },
        data: orderDetailsData,
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

const cancelOrder = async function (req, res) {
  try {
    const { orderId, reason } = req.body;
    if (!orderId) {
      throw new Error("Order id is required.");
    }

    const findQuery = {
      _id: new Types.ObjectId(orderId),
    };
    const updateQuery = {
      ...(reason && { reason }),
      orderStatus: 7, //C_CANCELLED
      C_cancelledDate: new Date().valueOf(),
    };
    const updateOrder = await orderModel.findOneAndUpdate(findQuery, {
      $set: updateQuery,
    });
    if (updateOrder) {
      return res.json({
        meta: { msg: "Order cancelled successsfully.", status: true },
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
  orderPlace,
  orderList,
  orderDetails,
  cancelOrder,
};
