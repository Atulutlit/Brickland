"use strict";
const { Types } = require("mongoose");
const { faqModel } = require("../model/faqModel");

const faqList = async function (req, res) {
  // try {
  //   const contentPerPage = Number(req.query.contentPerPage || 0);
  //   const page = Number(req.query.page || 0);
  //   const findQuery = {
  //     status: "ACTIVE",
  //   };
  //   const listData = await faqModel
  //     .find(findQuery)
  //     .find(findQuery)
  //     .sort({ createdAt: -1 })
  //     .skip(contentPerPage * page - contentPerPage)
  //     .limit(contentPerPage)
  //     .select();
  //   if (listData.length) {
  //     const total = await faqModel.countDocuments(findQuery);
  //     return res.json({
  //       meta: { msg: "FAQ list found successfully", status: true },
  //       data: listData,
  //       ...(contentPerPage && {
  //         pages: Math.ceil(total / contentPerPage),
  //         total,
  //       }),
  //     });
  //   } else {
  //     return res.json({
  //       meta: { msg: "Detail not found", status: false },
  //     });
  //   }
  // } catch (error) {
  //   return res.json({
  //     meta: { msg: error.message, status: false },
  //   });
  // }
  try{
      const listData = await faqModel.find();
      return res.json({
        meta: { msg: "FAQ list found successfully", status: true },
        data: listData,});
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const faqDetail = async function (req, res) {
  try {
    const { _id } = req.params;
    const findQuery = {
      status: "ACTIVE",
      _id: new Types.ObjectId(_id),
    };
    const listData = await faqModel.findOne(findQuery);
    if (listData) {
      return res.json({
        meta: { msg: "FAQ details found successfully", status: true },
        data: listData,
      });
    } else {
      return res.json({
        meta: { msg: "Detail not found", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  faqList,
  faqDetail,
};
