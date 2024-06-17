"use strict";
const { Types } = require("mongoose");
const { staticPageModel } = require("../model/staticPageModel");

const pageList = async function (req, res) {
  try {
    const { title } = req.query;
    const findQuery = {
      status: "ACTIVE",
      ...(title && { title }),
    };
    const listData = await staticPageModel
      .find(findQuery)
      .sort({ createdAt: -1 });
    if (listData.length) {
      return res.json({
        meta: { msg: "Page list found successfully", status: true },
        data: listData,
      });
    } else {
      return res.json({
        meta: { msg: "Page list not found", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const pageDetails = async function (req, res) {
  try {
    const { _id } = req.params;
    const findQuery = {
      status: "ACTIVE",
      _id: new Types.ObjectId(_id),
    };
    const detailData = await staticPageModel.findOne(findQuery);
    if (detailData) {
      return res.json({
        meta: { msg: "Page details found successfully", status: true },
        data: detailData,
      });
    } else {
      return res.json({
        meta: { msg: "Page not found", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const pageDetailsByUrl = async function (req, res) {
  try {
    const { url } = req.params;
    const findQuery = {
      status: "ACTIVE",
      url,
    };
    const detailData = await staticPageModel.findOne(findQuery);
    if (detailData) {
      return res.json({
        meta: { msg: "Page details found successfully", status: true },
        data: detailData,
      });
    } else {
      return res.json({
        meta: { msg: "Page not found", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  pageList,
  pageDetails,
  pageDetailsByUrl,
};
