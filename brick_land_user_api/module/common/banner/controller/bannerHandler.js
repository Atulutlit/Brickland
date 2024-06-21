"use strict";
const { Types } = require("mongoose");
const { bannerModel } = require("../model/bannerModel");

const bannerList = async (req, res) => {
  try {
    console.log("banner list hello worlld")
    // const { searchKey, type } = req.query;
    // console.log("hello worldkjfkskjf")
    // // if (!type) {
    // //   return res.json({
    // //     meta: { msg: "Type is required.", status: false },
    // //   });
    // // }
    // let page = Number(req.query.page || 0);
    // let contentPerPage = Number(req.query.contentPerPage || 0);
    // const findQuery = {
    //   status: "ACTIVE",
    //   type: type.toUpperCase(),
    //   ...(searchKey && {
    //     $or: [
    //       { title: { $regex: `${searchKey}.*`, $options: "i" } },
    //       { description: { $regex: `${searchKey}.*`, $options: "i" } },
    //       { url: { $regex: `${searchKey}.*`, $options: "i" } },
    //     ],
    //   }),
    // };
    // const bannerList = await bannerModel
    //   .find(findQuery)
    //   .sort({ createdAt: -1 })
    //   .skip(contentPerPage * page - contentPerPage)
    //   .limit(contentPerPage);
    // if (bannerList.length) {
    //   const total = await bannerModel.countDocuments(findQuery);
    //   return res.json({
    //     meta: { msg: "Banner list found.", status: true },
    //     data: bannerList,
    //     ...(contentPerPage && {
    //       pages: Math.ceil(total / contentPerPage),
    //       total,
    //     }),
    //   });
    // } else {
    //   return res.json({
    //     meta: { msg: "Banner list not found.", status: false },
    //   });
    // }
    const response = await bannerModel.find();
    console.log(response,'response');

    return res.json({
      meta: { msg: "Banner list found.", status: true },
      data: response,
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};


module.exports = {
  bannerList
};
