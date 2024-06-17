"use strict";
const { Types } = require("mongoose");
const { callbackModel } = require("../model/callbackModel");

const callbackList = async function (req, res) {
  try {
    // const { status, searchKey, userId, startDate, endDate } = req.query;
    // let contentPerPage = Number(req.query.contentPerPage || 100000);
    // let page = Number(req.query.page || 1);
    // const findQuery = {
    //   ...(status && { status: status.toUpperCase() }),
    //   ...(userId && { userId: new Types.ObjectId(userId) }),
    //   ...(searchKey && {
    //     $or: [
    //       { firstName: { $regex: `${searchKey}.*`, $options: "i" } },
    //       { lastName: { $regex: `${searchKey}.*`, $options: "i" } },
    //       { email: { $regex: `${searchKey}.*`, $options: "i" } },
    //       { mobile: { $regex: `${searchKey}.*`, $options: "i" } },
    //       { comment: { $regex: `${searchKey}.*`, $options: "i" } },
    //     ],
    //   }),
    //   ...(startDate &&
    //     startDate !== "undefined" &&
    //     endDate &&
    //     endDate !== "undefined" && {
    //       createdAt: {
    //         $gte: moment(Number(startDate)).startOf("day").valueOf(),
    //         $lte: moment(Number(endDate)).endOf("day").valueOf(),
    //       },
    //     }),
    // };
    // const listData = await callbackModel.aggregate(
    //   await getcallBackListPipeline(findQuery, page, contentPerPage)
    // );
    // if (listData.length && listData[0].data.length) {
    //   return res.json({
    //     meta: { msg: "Callback list found successfully", status: true },
    //     ...listData[0],
    //   });
    // } else {
    //   return res.json({
    //     meta: { msg: "Data not found.", status: false },
    //   });
    // }
    const response=await callbackModel.find();
    return res.json({
          meta: { msg: "Callback list found successfully", status: true },
          response,
        });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

const getcallBackListPipeline = async function (
  findQuery,
  page,
  contentPerPage
) {
  return [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: findQuery,
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
          {
            $addFields: {
              page: page,
            },
          },
        ],
        data: [
          {
            $skip: contentPerPage * page - contentPerPage,
          },
          {
            $limit: contentPerPage,
          },
        ],
      },
    },
    {
      $project: {
        data: 1,
        metadata: {
          $arrayElemAt: ["$metadata", 0],
        },
      },
    },
  ];
};

const callbackDetail = async function (req, res) {
  try {
    const { _id } = req.params;
    const findQuery = { _id: new Types.ObjectId(_id) };
    const productDetails = await callbackModel.aggregate(
      await getCallbackDetailsPipeline(findQuery)
    );
    if (productDetails.length) {
      return res.json({
        meta: { msg: "Callback details found successfully", status: true },
        data: productDetails[0],
      });
    } else {
      return res.json({
        meta: { msg: "Details not found", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

const getCallbackDetailsPipeline = async function (findQuery) {
  return [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: findQuery,
    },
  ];
};

const changeStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    const tempStatus = {
      ...(status.toLowerCase() === "pending" && { status: "PENDING" }),
      ...(status.toLowerCase() === "resolved" && { status: "RESOLVED" }),
    };
    if (!tempStatus.status) {
      return res.json({
        meta: {
          msg: "Invalid status, Please send a valid status.",
          status: false,
        },
      });
    }
    const updateStatus = await callbackModel.updateOne(
      { _id: new Types.ObjectId(_id) },
      {
        $set: tempStatus,
      }
    );
    if (updateStatus.modifiedCount > 0) {
      return res.json({
        meta: {
          msg: `Callback status changed to ${status.toLowerCase()} successfully.`,
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

const deletecallback = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteCallback = await callbackModel.deleteOne({
      _id: new Types.ObjectId(_id),
    });
    if (deleteCallback.deletedCount > 0) {
      return res.json({
        meta: { msg: `Callback deleted Successfully.`, status: true },
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
  callbackList,
  callbackDetail,
  changeStatus,
  deletecallback,
};
