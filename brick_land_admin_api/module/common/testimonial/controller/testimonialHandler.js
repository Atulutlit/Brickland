"use strict";
const { Types } = require("mongoose");
const { testimonialModel } = require("../model/testimonialModel");

const addTestimonial = async function (req, res) {
  try {
    const { title, description, testimonialImg } = req.body;
    const findTestimonial = await testimonialModel.findOne({ title });
    if (findTestimonial) {
      return res.json({
        meta: {
          msg: "Testimonial already added with this title",
          status: false,
        },
      });
    }
    const addObj = {
      title,
      description,
      testimonialImg,
    };
    const addData = await testimonialModel.create(addObj);
    if (addData) {
      return res.json({
        meta: { msg: "Testimonial added Successfully.", status: true },
        data: addData,
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

const testimonialList = async (req, res) => {
  try {
    const { status, searchKey } = req.query;
    let page = Number(req.query.page || 0);
    let contentPerPage = Number(req.query.contentPerPage || 0);
    const findQuery = {
      ...(status && { status: status.toUpperCase() }),
      ...(searchKey && {
        $or: [
          { title: { $regex: `${searchKey}.*`, $options: "i" } },
          { description: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
    };
    const listData = await testimonialModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .skip(contentPerPage * page - contentPerPage)
      .limit(contentPerPage);
    if (listData.length) {
      const total = await testimonialModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "Testimonials list found.", status: true },
        data: listData,
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

const testimonialDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    const detailData = await testimonialModel.findOne({
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

const updateTestimonial = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, description, testimonialImg } = req.body;
    if (title) {
      const findTestimonial = await testimonialModel.findOne({
        title,
        _id: new Types.ObjectId(_id),
      });
      if (!findTestimonial) {
        const findTestimonialAgain = await testimonialModel.findOne({ title });
        if (findTestimonialAgain) {
          return res.json({
            meta: {
              msg: "Testimonial already exist with this title.",
              status: false,
            },
          });
        }
      }
    }
    const findQuery = { _id: new Types.ObjectId(_id) };
    const updateQuery = {
      title,
      description,
      testimonialImg,
    };
    const updateData = await testimonialModel.findOneAndUpdate(findQuery, {
      $set: updateQuery,
    });
    if (updateData) {
      return res.json({
        meta: { msg: "Testimonial updated Successfully.", status: true },
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

const changeStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    const tempStatus = {
      ...(status.toLowerCase() === "active" && { status: "ACTIVE" }),
      ...(status.toLowerCase() === "deactive" && { status: "DEACTIVE" }),
      ...(status.toLowerCase() === "delete" && { status: "DELETE" }),
    };
    if (!tempStatus.status) {
      return res.json({
        meta: {
          msg: "Invalid status, Please send a valid status.",
          status: false,
        },
      });
    }
    const updateStatus = await testimonialModel.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      { $set: tempStatus }
    );
    if (updateStatus) {
      return res.json({
        meta: {
          msg: `Testimonial status changed to ${status.toLowerCase()} Successfully.`,
          status: true,
        },
      });
    } else {
      return res.json({
        meta: { msg: "something went wrong", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const deleteTestimonials = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteTestimonials = await testimonialModel.deleteOne({
      _id: new Types.ObjectId(_id),
    });
    if (deleteTestimonials.deletedCount > 0) {
      return res.json({
        meta: { msg: `Testimonials deleted Successfully.`, status: true },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  addTestimonial,
  testimonialList,
  testimonialDetail,
  updateTestimonial,
  changeStatus,
  deleteTestimonials,
};
