'use strict';
const { Types } = require("mongoose");
const { config } = require("../../../../config/env");
const { blogsModel } = require("../model/blogsModel");

const addBlogs = async function (req, res) {
  try {
    const {
      title,
      description
    } = req.body;
    if (
      !title ||
      !description
    ) {
      return res.json({
        meta: { msg: "Parameter missing", status: false },
      });
    }
    const findBlogs = await blogsModel.findOne({ title });
    if (findBlogs) {
      return res.json({
        meta: { msg: "Blogs already added with this title", status: false },
      });
    }
    const addObj = {
      title,
      description,
      ...(req.file && { blogsImg: req.file.location }),
    };
    const addData = await blogsModel.create(addObj);
    if (addData) {
      return res.json({
        meta: { msg: "Blogs added Successfully.", status: true },
        data: addData
      });
    } else {
      return res.json({
        meta: { msg: 'Something went wrong.', status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const blogsList = async (req, res) => {
  try {
    const { status, searchKey } = req.query;
    let page = Number(req.query.page || 0);
    let contentPerPage = Number(req.query.contentPerPage || 0);
    const findQuery = {
      ...(status && { status: status.toUpperCase() }),
      ...(searchKey && {
        $or: [
          { title: { '$regex': `${searchKey}.*`, $options: "i" } },
          { description: { '$regex': `${searchKey}.*`, $options: "i" } },
        ]
      }),
    };
    const listData = await blogsModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .skip(contentPerPage * page - contentPerPage)
      .limit(contentPerPage)
      .select();
    if (listData.length) {
      const total = await blogsModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "Blogs list found.", status: true },
        data: listData,
        ...(contentPerPage && {
          pages: Math.ceil(total / contentPerPage),
          total
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

const blogsDetail = async (req, res) => {
  try {
    const { blogsId } = req.params;
    if (!blogsId) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    const detailData = await blogsModel.findOne({
      blogsId: Types.ObjectId(blogsId),
    });
    if (detailData) {
      return res.json({
        meta: { msg: "Blogs details found.", status: true },
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

const updateBlogs = async (req, res) => {
  try {
    const {
      blogsId,
      title,
      description
    } = req.body;
    if (
      !blogsId ||
      !title ||
      !description
    ) {
      return res.json({
        meta: { msg: "Parameter missing", status: false },
      });
    }
    if (title) {
      const findBlogs = await blogsModel.findOne({ title, blogsId: Types.ObjectId(blogsId) });
      if (!findBlogs) {
        const findBlogsAgain = await blogsModel.findOne({ title });
        if (findBlogsAgain) {
          return res.json({
            meta: { msg: "Blogs already exist with this title.", status: false }
          })
        }
      };
    }
    const findQuery = { blogsId: Types.ObjectId(blogsId) };
    const updateQuery = {
      title,
      description,
      ...(req.file && { blogsImg: req.file.location }),
    };
    const updateData = await blogsModel.updateOne(findQuery, { $set: updateQuery });
    if (updateData.nModified > 0 && updateData.n > 0) {
      return res.json({
        meta: { msg: "Blogs updated Successfully.", status: true },
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
    const { blogsId, status } = req.body;
    if (!blogsId) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
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
    const updateStatus = await blogsModel.updateOne(
      { blogsId: Types.ObjectId(blogsId) },
      {
        $set: tempStatus,
      }
    );
    if (updateStatus.nModified > 0 && updateStatus.n > 0) {
      return res.json({
        meta: {
          msg: `Blogs status changed to ${status.toLowerCase()} Successfully.`,
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

module.exports = {
  addBlogs,
  blogsList,
  blogsDetail,
  updateBlogs,
  changeStatus
};
