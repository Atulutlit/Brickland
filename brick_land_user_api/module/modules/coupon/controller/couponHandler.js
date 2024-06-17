"use strict";
const { Types } = require("mongoose");
const { couponModel } = require("../model/couponModel");
const moment = require("moment");

const couponList = async (req, res) => {
  try {
    let page = Number(req.query.page || 0);
    let contentPerPage = Number(req.query.contentPerPage || 0);
    const findQuery = {
      status: "ACTIVE",
      startDate: { $lte: moment().valueOf() },
      endDate: { $gte: moment().valueOf() },
    };
    const couponList = await couponModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .skip(contentPerPage * page - contentPerPage)
      .limit(contentPerPage)
      .select();
    if (couponList.length) {
      const total = await couponModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "Coupon list found.", status: true },
        data: couponList,
        ...(contentPerPage && {
          pages: Math.ceil(total / contentPerPage),
          total,
        }),
      });
    } else {
      return res.json({
        meta: { msg: "Data not found.", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

const couponDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    const detailData = await couponModel.findOne({
      _id: new Types.ObjectId(_id),
      status: "ACTIVE",
      startDate: { $lte: moment().valueOf() },
      endDate: { $gte: moment().valueOf() },
    });
    if (detailData) {
      return res.json({
        meta: { msg: "Coupon details found.", status: true },
        data: detailData,
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  couponList,
  couponDetail,
};
