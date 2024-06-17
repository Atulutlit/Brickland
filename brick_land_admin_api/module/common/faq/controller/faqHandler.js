"use strict";
const { Types } = require("mongoose");
const { faqModel } = require("../model/faqModel");

const addFaq = async function (req, res) {
  try {
    const { question, answer } = req.body;
    const findfaq = await faqModel.findOne({ question });
    if (findfaq) {
      return res.json({
        meta: { msg: "Faq already exist with this question.", status: false },
      });
    }
    const addFaq = {
      question,
      answer,
    };
    const addFaqData = await faqModel.create(addFaq);
    if (addFaqData) {
      return res.json({
        meta: { msg: "Faq added Successfully.", status: true },
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

const faqList = async (req, res) => {
  try {
    const { status, searchKey } = req.query;
    let page = Number(req.query.page || 0);
    let contentPerPage = Number(req.query.contentPerPage || 0);
    const findQuery = {
      ...(status && { status: status.toUpperCase() }),
      ...(searchKey && {
        $or: [
          { question: { $regex: `${searchKey}.*`, $options: "i" } },
          { answer: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
    };
    const faqList = await faqModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .skip(contentPerPage * page - contentPerPage)
      .limit(contentPerPage)
      .select();
    if (faqList.length) {
      const total = await faqModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "FAQ list found.", status: true },
        data: faqList,
        ...(contentPerPage && {
          pages: Math.ceil(total / contentPerPage),
          total,
        }),
      });
    } else {
      return res.json({
        meta: { msg: "Data not found.", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

const faqDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    const detailData = await faqModel.findOne({ _id: new Types.ObjectId(_id) });
    if (detailData) {
      return res.json({
        meta: { msg: "FAQ details found.", status: true },
        data: detailData,
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

const updateFaq = async (req, res) => {
  try {
    const { _id } = req.params;
    const { question, answer } = req.body;
    const findFaq = await faqModel.findOne({
      question,
      _id: new Types.ObjectId(_id),
    });
    if (!findFaq) {
      const findFaqAgain = await faqModel.findOne({ question });
      if (findFaqAgain) {
        return res.json({
          meta: { msg: "Faq already exist with this question.", status: false },
        });
      }
    }
    const findQuery = { _id: new Types.ObjectId(_id) };
    const updateQuery = {
      question,
      answer,
    };
    const updateData = await faqModel.findOneAndUpdate(findQuery, {
      $set: updateQuery,
    });
    if (updateData) {
      return res.json({
        meta: { msg: "Faq updated Successfully.", status: true },
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
    };
    if (!pageStatus.status) {
      return res.json({
        meta: {
          msg: "Invalid status, Please send a valid status.",
          status: false,
        },
      });
    }
    const updateCoupon = await faqModel.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      { $set: pageStatus }
    );
    if (updateCoupon) {
      return res.json({
        meta: { msg: "FAQ status changed Successfully.", status: true },
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

const deleteFaq = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteFaq = await faqModel.deleteOne({
      _id: new Types.ObjectId(_id),
    });
    if (deleteFaq.deletedCount > 0) {
      return res.json({
        meta: { msg: `Faq deleted Successfully.`, status: true },
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
  addFaq,
  faqList,
  faqDetail,
  updateFaq,
  changeStatus,
  deleteFaq,
};
