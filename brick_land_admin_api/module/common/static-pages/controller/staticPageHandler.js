"use strict";
const { Types } = require("mongoose");
const { staticPageModel } = require("../model/staticPageModel");

const addPage = async function (req, res) {
  try {
    const { title, url, description } = req.body;
    const findPage = await staticPageModel.findOne({ url });
    if (findPage) {
      return res.json({
        meta: { msg: "Page exist with this URL.", status: false },
      });
    }
    const addPage = { title, url, description };
    const addPageData = await staticPageModel.create(addPage);
    if (addPageData) {
      return res.json({
        meta: { msg: "Page added Successfully.", status: true },
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

const pageList = async function (req, res) {
  try {
    const { status, searchKey } = req.query;
    let contentPerPage = Number(req.query.contentPerPage || 0);
    let page = Number(req.query.page || 0);
    const findQuery = {
      ...(status && { status: status.toUpperCase() }),
      ...(searchKey && {
        $or: [
          { title: { $regex: `${searchKey}.*`, $options: "i" } },
          { description: { $regex: `${searchKey}.*`, $options: "i" } },
          { url: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
    };
    const listData = await staticPageModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .skip(contentPerPage * page - contentPerPage)
      .limit(contentPerPage)
      .select();
    if (listData.length) {
      const total = await staticPageModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "Page list found successfully", status: true },
        data: listData,
        ...(contentPerPage && {
          pages: Math.ceil(total / contentPerPage || 1),
          total,
        }),
      });
    } else {
      return res.json({
        meta: { msg: "List not found", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const pageDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    const detailData = await staticPageModel.findOne({
      _id: new Types.ObjectId(_id),
    });
    if (detailData) {
      return res.json({
        meta: { msg: "Page details found.", status: true },
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

const updatePage = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, url, description } = req.body;
    const findPage = await staticPageModel.findOne({
      title,
      _id: new Types.ObjectId(_id),
    });
    if (!findPage) {
      const findPageAgain = await staticPageModel.findOne({ title });
      if (findPageAgain) {
        return res.json({
          meta: { msg: "Page already exist with this title.", status: false },
        });
      }
    }
    const findQuery = { _id: new Types.ObjectId(_id) };
    const updateQuery = {
      title,
      url,
      description,
    };
    const updateData = await staticPageModel.findOneAndUpdate(findQuery, {
      $set: updateQuery,
    });
    if (updateData) {
      return res.json({
        meta: { msg: "Page updated Successfully.", status: true },
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
    const pageStatus = {
      ...(status.toLowerCase() === "active" && { status: "ACTIVE" }),
      ...(status.toLowerCase() === "deactive" && { status: "DEACTIVE" }),
      ...(status.toLowerCase() === "delete" && { status: "DELETE" }),
    };
    if (!pageStatus.status) {
      return res.json({
        meta: {
          msg: "Invalid status, Please send a valid status.",
          status: false,
        },
      });
    }
    const updatePage = await staticPageModel.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      { $set: pageStatus }
    );
    if (updatePage) {
      return res.json({
        meta: { msg: "Page status changed Successfully.", status: true },
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

const deletePage = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletePage = await staticPageModel.deleteOne({
      _id: new Types.ObjectId(_id),
    });
    if (deletePage.deletedCount > 0) {
      return res.json({
        meta: { msg: `Page deleted Successfully.`, status: true },
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
  addPage,
  pageList,
  pageDetail,
  updatePage,
  changeStatus,
  deletePage,
};
