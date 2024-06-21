'use strict';
const { Types } = require("mongoose");
const { blogsModel } = require("../model/blogsModel");

// List blogs with pagination and search
const blogsList = async (req, res) => {
  try {
    const { status, searchKey } = req.query;
    const page = Number(req.query.page) || 1;
    const contentPerPage = Number(req.query.contentPerPage) || 10;

    const findQuery = {
      ...(status && { status: status.toUpperCase() }),
      ...(searchKey && {
        $or: [
          { blogTitle: { '$regex': searchKey, $options: "i" } },
          { content: { '$regex': searchKey, $options: "i" } },
        ]
      }),
    };

    const listData = await blogsModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * contentPerPage)
      .limit(contentPerPage);

    const total = await blogsModel.countDocuments(findQuery);

    return res.json({
      meta: { msg: listData.length ? "Blogs list found." : "No blogs found.", status: listData.length > 0 },
      data: listData,
      pages: Math.ceil(total / contentPerPage),
      total
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

// Get details of a single blog
const blogsDetail = async (req, res) => {
  try {
    const { blogsId } = req.params;

    // Validate ObjectId
    if (!Types.ObjectId.isValid(blogsId)) {
      return res.json({
        meta: { msg: "Invalid blog ID format.", status: false },
      });
    }

    const detailData = await blogsModel.findById(blogsId);

    if (detailData) {
      return res.json({
        meta: { msg: "Blog details found.", status: true },
        data: detailData,
      });
    } else {
      return res.json({
        meta: { msg: "Blog not found.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  blogsList,
  blogsDetail
};
