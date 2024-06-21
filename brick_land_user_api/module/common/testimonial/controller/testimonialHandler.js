"use strict";
const { Types } = require("mongoose");
const { testimonialModel } = require("../model/testimonialModel");

const testimonialList = async (req, res) => {
  // try {
  //   const { searchKey } = req.query;
  //   let page = Number(req.query.page || 0);
  //   let contentPerPage = Number(req.query.contentPerPage || 0);
  //   const findQuery = {
  //     status: "ACTIVE",
  //     ...(searchKey && {
  //       $or: [
  //         { title: { $regex: `${searchKey}.*`, $options: "i" } },
  //         { description: { $regex: `${searchKey}.*`, $options: "i" } },
  //       ],
  //     }),
  //   };
  //   const listData = await testimonialModel
  //     .find(findQuery)
  //     .sort({ createdAt: -1 })
  //     .skip(contentPerPage * page - contentPerPage)
  //     .limit(contentPerPage)
  //     .select();
  //   if (listData.length) {
  //     const total = await testimonialModel.countDocuments(findQuery);
  //     return res.json({
  //       meta: { msg: "Testimonial list found.", status: true },
  //       data: listData,
  //       ...(contentPerPage && {
  //         pages: Math.ceil(total / contentPerPage),
  //         total,
  //       }),
  //     });
  //   } else {
  //     return res.json({
  //       meta: { msg: "List not found.", status: false },
  //     });
  //   }
  // } catch (error) {
  //   return res.json({
  //     meta: { msg: error.message, status: false },
  //   });
  // }
  try{
    const listData = await testimonialModel.find();
    return res.json({
      meta: { msg: "testimonial list found successfully", status: true },
      data: listData,});
} catch (error) {
  return res.json({
    meta: { msg: error.message, status: false },
  });
}
};

const testimonialDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    const detailData = await testimonialModel.findOne({
      status: "ACTIVE",
      _id: new Types.ObjectId(_id),
    });
    if (detailData) {
      return res.json({
        meta: { msg: "Testimonial details found.", status: true },
        data: detailData,
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
  testimonialList,
  testimonialDetail,
};
