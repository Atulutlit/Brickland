'use strict';
const { Types } = require("mongoose");
const { blogsModel } = require("../model/blogsModel");

// Add a new blog
const blogsAdd = async (req, res) => {
  try {
    const data = req.body;
    const { blogTitle } = data;

    // Check if a blog with the same title already exists
    const findBlogs = await blogsModel.findOne({ blogTitle });
    if (findBlogs) {
      return res.json({
        meta: { msg: "Blog already added with this title", status: false },
      });
    }

    // Create a new blog entry
    const addData = await blogsModel.create(data);
    return res.json({
      meta: { msg: "Blog added successfully.", status: true },
      data: addData
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

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

// Update a blog
const blogsUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Validate ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return res.json({
        meta: { msg: "Invalid blog ID format.", status: false },
      });
    }

    const findBlogs = await blogsModel.findById(id);

    if (!findBlogs) {
      return res.json({
        meta: { msg: "Blog not found.", status: false },
      });
    }

    const updateData = await blogsModel.updateOne({ _id: id }, { $set: data });

    if (updateData.modifiedCount > 0) {
      return res.json({
        meta: { msg: "Blog updated successfully.", status: true },
      });
    } else {
      return res.json({
        meta: { msg: "No changes made to the blog.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

// Delete a blog
const blogsDelete = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return res.json({
        meta: { msg: "Invalid blog ID format.", status: false },
      });
    }

    const result = await blogsModel.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      return res.json({
        meta: { msg: "Successfully deleted.", status: true },
      });
    } else {
      return res.json({
        meta: { msg: "Blog not found.", status: false },
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({
      meta: { msg: "Internal server error.", status: false },
    });
  }
};

module.exports = {
  blogsList,
  blogsDetail,
  blogsAdd,
  blogsDelete,
  blogsUpdate
};
