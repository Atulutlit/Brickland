'use strict';
const { Types } = require("mongoose");
const blogsModel = require("../model/blogsModel");

// List blogs with pagination and search
const blogsList = async (req, res) => {
  try {
    // const { status, searchKey } = req.query;
    // const page = Number(req.query.page) || 1;
    // const contentPerPage = Number(req.query.contentPerPage) || 10;

    // const findQuery = {
    //   ...(status && { status: status.toUpperCase() }),
    //   ...(searchKey && {
    //     $or: [
    //       { blogTitle: { '$regex': searchKey, $options: "i" } },
    //       { content: { '$regex': searchKey, $options: "i" } },
    //     ]
    //   }),
    // };

    // const listData = await blogsModel
    //   .find(findQuery)
    //   .sort({ createdAt: -1 })
    //   .skip((page - 1) * contentPerPage)
    //   .limit(contentPerPage);

    // const total = await blogsModel.countDocuments(findQuery);
    const listData = await blogsModel.find();
    return res.json({
      meta: { msg: listData.length ? "Blogs list found." : "No blogs found.", status: listData.length > 0 },
      data: listData,
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

// blog detail
const blogsDetail = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, 'id');

    // Validate ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return res.json({
        meta: { msg: "Invalid blog ID format.", status: false },
      });
    }

    const detailData = await blogsModel.findById(id);

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


const addComment = async (req, res) => {
  try {
    const { name, message } = req.body;
    const { id } = req.params;
    console.log(name,message,req.body,'add comment');

    // Ensure name and message are provided
    if (!name || !message) {
      return res.json({
        meta: { msg: "Name and message are required.", status: false },
      });
    }

    // Construct the comment object

    const comment = { "name":name, "message":message,"active":false,"createdAt":new Date() };

    console.log(comment,'comment');

    // Update the blog post by pushing the new comment to the "comments" array
    const updateStatus = await blogsModel.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        $push: { comment: comment },
      }
    );

    console.log(updateStatus,'update Status');

    if (updateStatus.modifiedCount > 0) {
      return res.json({
        meta: {
          msg: "Comment added successfully.",
          status: true,
        },
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
  blogsList,
  blogsDetail,
  addComment
};
