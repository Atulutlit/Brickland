"use strict";
const { Types } = require("mongoose");
const { userModel } = require("../model/userModel");

const userList = async (req, res) => {
  try {
    console.log("user list")
    const { status, searchKey } = req.query;
    let page = Number(req.query.page || 0);
    let contentPerPage = Number(req.query.contentPerPage || 0);
    const findQuery = {
      ...(status && { status: status.toUpperCase() }),
      ...(searchKey && {
        $or: [
          { name: { $regex: `${searchKey}.*`, $options: "i" } },
          { email: { $regex: `${searchKey}.*`, $options: "i" } },
          { country: { $regex: `${searchKey}.*`, $options: "i" } },
          { state: { $regex: `${searchKey}.*`, $options: "i" } },
          { district: { $regex: `${searchKey}.*`, $options: "i" } },
          { city: { $regex: `${searchKey}.*`, $options: "i" } },
          { pincode: { $regex: `${searchKey}.*`, $options: "i" } },
          { address: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
    };
    const listData = await userModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .skip(contentPerPage * page - contentPerPage)
      .limit(contentPerPage)
      .select("-otpVerified -isLogin -mobileOtp -coordinates ");
    if (listData.length) {
      const total = await userModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "User list found.", status: true },
        data: listData,
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

const userDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    const detailData = await userModel
      .findOne({
        _id: new Types.ObjectId(_id),
      })
      .select(
        "-coordinates -deviceToken -isLogin -isProfileComplete -otpVerified -isMobileOtpValid -isMobileLoginOtpValid -mobileOtp"
      );
    if (detailData) {
      return res.json({
        meta: { msg: "User details found.", status: true },
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

const changeStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    if (!_id) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    const tempStatus = {
      ...(status.toLowerCase() === "active" && { status: "ACTIVE" }),
      ...(status.toLowerCase() === "deactive" && { status: "DEACTIVE" }),
    };
    if (!tempStatus.status) {
      return res.json({
        meta: {
          msg: "Invalid status, Please send a valid status.",
          status: false,
        },
      });
    }
    const updateStatus = await userModel.updateOne(
      { _id: new Types.ObjectId(_id) },
      {
        $set: tempStatus,
      }
    );
    if (updateStatus.modifiedCount > 0) {
      return res.json({
        meta: {
          msg: `User status changed to ${status.toLowerCase()} Successfully.`,
          status: true,
        },
      });
    } else {
      return res.json({
        meta: { msg: "something went wrong", status: false },
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
  userList,
  userDetail,
  changeStatus,
};
