"use strict";
const { Types } = require("mongoose");
const { eventModel } = require("../model/eventModel");
const {
  eventCategoryModel,
} = require("../../../modules/event-category/model/categoryModel");

const addEvent = async function (req, res) {
  try {
    console.log("Hello world!!!")
    console.log(req.body,'req.body')
    const {title, description, location, link, eventDate } =
      req.body;
      
    const findEvent = await eventModel.findOne({ title });
    if (findEvent) {
      return res.json({
        meta: { msg: "Event already added with this title", status: false },
      });
    }

    const addObj = {
      title,
      description,
      location,
      link,
      eventDate,
    };
    console.log(addObj,'add object')
    const addData = await eventModel.create(addObj);
    if (addData) {
      return res.json({
        meta: { msg: "Event added Successfully.", status: true },
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

const eventList = async function (req, res) {
  try {
    const { searchKey, categoryId } = req.query;
    let contentPerPage = Number(req.query.contentPerPage || 100000);
    let page = Number(req.query.page || 1);
    const findQuery = {
      ...(categoryId && { categoryId: new Types.ObjectId(categoryId) }),
      ...(searchKey && {
        $or: [
          { title: { $regex: `${searchKey}.*`, $options: "i" } },
          { description: { $regex: `${searchKey}.*`, $options: "i" } },
          { location: { $regex: `${searchKey}.*`, $options: "i" } },
          { link: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
    };
    const listData = await eventModel.aggregate(
      await getEventListPipeline(findQuery, page, contentPerPage)
    );
    if (listData.length && listData[0].data.length) {
      return res.json({
        meta: { msg: "Event list found successfully", status: true },
        ...listData[0],
      });
    } else {
      return res.json({
        meta: { msg: "Data not found.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const getEventListPipeline = async function (findQuery, page, contentPerPage) {
  return [
    {
      $match: findQuery,
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true,
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

const eventDetails = async function (req, res) {
  try {
    const { _id } = req.params;
    const findQuery = { _id: new Types.ObjectId(_id) };
    const detailData = await eventModel.aggregate(
      await eventDetailsPipeline(findQuery)
    );
    if (detailData.length) {
      return res.json({
        meta: { msg: "Event details found successfully", status: true },
        data: detailData[0],
      });
    } else {
      return res.json({
        meta: { msg: "Details not found", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const eventDetailsPipeline = async function (findQuery) {
  return [
    {
      $match: findQuery,
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];
};

const updateEvent = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params;
    console.log(data,'data')
   
    const updateStatus = await eventModel.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        $set: data,
      }
    );
    if (updateStatus.modifiedCount > 0) {
      return res.json({
        meta: {
          msg: `event updated successfully.`,
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

const changeStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    if (!_id) {
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
    const updateStatus = await eventModel.updateOne(
      { _id: Types.ObjectId(_id) },
      {
        $set: tempStatus,
      }
    );
    if (updateStatus.nModified > 0 && updateStatus.n > 0) {
      return res.json({
        meta: {
          msg: `Event status changed to ${status.toLowerCase()} Successfully.`,
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

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    const deleteData = await eventModel.deleteOne({
      _id: new Types.ObjectId(id),
    });
    if (deleteData.deletedCount > 0) {
      return res.json({
        meta: { msg: `Product deleted Successfully.`, status: true },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  addEvent,
  eventList,
  eventDetails,
  updateEvent,
  changeStatus,
  deleteEvent,
};
