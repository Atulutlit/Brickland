"use strict";
const { get: _get } = require("lodash");
const { Types } = require("mongoose");
const { eventCategoryModel } = require("../model/categoryModel");
const {
  getCustomEventCategoryId,
  getCustomSubCategoryId,
} = require("../../../common/counter/controller/counterHandler");
const moment = require("moment/moment");
const { productModel } = require("../../product/model/productModel");

const addCategory = async function (req, res) {
  try {
    let { type, categoryName, slug, categoryImg, description, url, parentId } =
      req.body;
    const checkCategoryData = await eventCategoryModel.findOne({
      categoryName,
      type: type.toUpperCase(),
    });
    if (checkCategoryData) {
      return res.json({
        meta: { msg: "Category already added with this name.", status: false },
      });
    }
    if (slug) {
      const checkSlugData = await eventCategoryModel.findOne({ slug });
      if (checkSlugData) {
        slug = slug + "-1";
      }
    }
    let checkCategoryId;
    if (parentId) {
      checkCategoryId = await eventCategoryModel.findOne({
        _id: new Types.ObjectId(parentId),
      });
      if (!checkCategoryId) {
        return res.json({
          meta: { msg: "Category not found.", status: false },
        });
      }
    }
    let categoryId;
    if (type && type.toUpperCase() === "ROOT") {
      categoryId = await getCustomEventCategoryId();
    } else {
      categoryId = await getCustomSubCategoryId();
    }
    const addObj = {
      categoryId,
      ...(parentId && { parentId }),
      ...(type && { type: type.toUpperCase() }),
      categoryName,
      ...(slug && { slug }),
      description,
      ...(url && { url }),
      categoryImg,
    };
    const addCategory = await eventCategoryModel.create(addObj);
    if (addCategory) {
      return res.json({
        meta: { msg: "Category added successfully.", status: true },
        data: addCategory,
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const categoryList = async function (req, res) {
  try {
    const { status, searchKey, type, startDate, endDate } = req.query;
    let contentPerPage = Number(req.query.contentPerPage || 0);
    let page = Number(req.query.page || 0);
    const findQuery = {
      ...(type && { type: type.toUpperCase() }),
      ...(status && { status: status.toUpperCase() }),
      ...(searchKey && {
        $or: [
          { categoryId: { $regex: `${searchKey}.*`, $options: "i" } },
          { categoryName: { $regex: `${searchKey}.*`, $options: "i" } },
          { description: { $regex: `${searchKey}.*`, $options: "i" } },
          { url: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
      ...(startDate &&
        startDate !== "undefined" &&
        endDate &&
        endDate !== "undefined" && {
          createdAt: {
            $gte: moment(Number(startDate)).startOf("day").valueOf(),
            $lte: moment(Number(endDate)).endOf("day").valueOf(),
          },
        }),
    };
    const categoryListData = await eventCategoryModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .limit(contentPerPage)
      .skip(contentPerPage * page - contentPerPage);
    if (categoryListData.length) {
      const total = await eventCategoryModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "Category list found successfully", status: true },
        data: categoryListData,
        ...(contentPerPage && {
          pages: Math.ceil(total / contentPerPage || 1),
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

const subCategoryList = async function (req, res) {
  try {
    const { status, searchKey, startDate, endDate, categoryId } = req.query;
    let contentPerPage = Number(req.query.contentPerPage || 100000);
    let page = Number(req.query.page || 1);
    const findQuery = {
      ...(searchKey && {
        $or: [
          { categoryName: { $regex: `${searchKey}.*`, $options: "i" } },
          { description: { $regex: `${searchKey}.*`, $options: "i" } },
          { categoryId: { $regex: `${searchKey}.*`, $options: "i" } },
          { slug: { $regex: `${searchKey}.*`, $options: "i" } },
          {
            "category.categoryName": {
              $regex: `${searchKey}.*`,
              $options: "i",
            },
          },
          {
            "category.description": { $regex: `${searchKey}.*`, $options: "i" },
          },
          {
            "category.categoryId": { $regex: `${searchKey}.*`, $options: "i" },
          },
          { "category.slug": { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
      ...(status && { status: status.toUpperCase() }),
      ...(startDate &&
        startDate !== "undefined" &&
        endDate &&
        endDate !== "undefined" && {
          createdAt: {
            $gte: moment(Number(startDate)).startOf("day").valueOf(),
            $lte: moment(Number(endDate)).endOf("day").valueOf(),
          },
        }),
    };
    const subCategoryListData = await eventCategoryModel.aggregate([
      {
        $match: {
          type: "PARENT",
          ...(categoryId && {
            parentId: new Types.ObjectId(categoryId),
          }),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "parentId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: false,
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
    ]);
    if (subCategoryListData.length && subCategoryListData[0].data.length) {
      return res.json({
        meta: { msg: "Category list found successfully", status: true },
        ...subCategoryListData[0],
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

const getCategoryById = async function (req, res) {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.json({
        meta: { msg: "Parameter Missing", status: false },
      });
    }
    const categoryData = await eventCategoryModel.findOne({
      _id: new Types.ObjectId(_id),
    });
    if (categoryData) {
      return res.json({
        meta: { msg: "Category found successfully", status: true },
        data: categoryData,
      });
    } else {
      return res.json({
        meta: { msg: "Category not found", status: false },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

const updateCategory = async function (req, res) {
  try {
    let {
      _id,
      categoryName,
      slug,
      description,
      url,
      parentId,
      metaTitle,
      metaDescription,
      metaKeyword,
      categoryImg,
    } = req.body;
    if (!_id) {
      return res.json({
        meta: { msg: "Parameter Missing", status: false },
      });
    }
    const findQuery = {
      _id: new Types.ObjectId(_id),
    };
    const findCategory = await eventCategoryModel.findOne(findQuery);
    if (!findCategory) {
      return res.json({
        meta: { msg: "Category not found", status: false },
      });
    }
    let checkCategoryId;
    if (parentId) {
      checkCategoryId = await eventCategoryModel.findOne({
        _id: new Types.ObjectId(parentId),
      });
      if (!checkCategoryId) {
        return res.json({
          meta: { msg: "Category not found.", status: false },
        });
      }
    }
    if (categoryName) {
      const findCategory = await eventCategoryModel.findOne({
        categoryName,
        _id: new Types.ObjectId(_id),
        ...(parentId && { type: checkCategoryId.type }),
        ...(!parentId && { type: "ROOT" }),
      });
      if (!findCategory) {
        const findCategoryAgain = await eventCategoryModel.findOne({
          categoryName,
          ...(parentId && { type: checkCategoryId.type }),
          ...(!parentId && { type: "ROOT" }),
        });
        if (findCategoryAgain) {
          return res.json({
            meta: {
              msg: "Category already exist with this Name.",
              status: false,
            },
          });
        }
      }
    }
    if (slug) {
      const checkSlugData = await eventCategoryModel.findOne({
        slug,
        _id: new Types.ObjectId(_id),
      });
      if (!checkSlugData) {
        const checkSlugDataAgain = await eventCategoryModel.findOne({ slug });
        if (checkSlugDataAgain) {
          slug = slug + "-1";
        }
      }
    }
    const updateQuery = {
      ...(parentId && { parentId }),
      ...(categoryName && { categoryName }),
      ...(slug && { slug }),
      ...(description && { description }),
      ...(url && { url }),
      ...(metaTitle && { metaTitle }),
      ...(metaDescription && { metaDescription }),
      ...(metaKeyword && { metaKeyword }),
      ...(categoryImg && { categoryImg }),
    };
    const updatedCategoryData = await eventCategoryModel.findOneAndUpdate(
      findQuery,
      { $set: updateQuery },
      { new: true }
    );
    if (updatedCategoryData) {
      return res.json({
        meta: { msg: "Category updated successfully.", status: true },
        data: updatedCategoryData,
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: true },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

const changeCategoryStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    const categoryStatus = {
      ...(status.toLowerCase() === "active" && { status: "ACTIVE" }),
      ...(status.toLowerCase() === "deactive" && { status: "DEACTIVE" }),
    };
    if (!categoryStatus.status) {
      return res.json({
        meta: {
          msg: "Invalid status, Please send a valid status.",
          status: false,
        },
      });
    }
    let updateData = await eventCategoryModel.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      { $set: { status: categoryStatus.status } },
      { new: true }
    );
    if (updateData) {
      return res.json({
        meta: { msg: "Status updated successfully.", status: true },
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

const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    const findCategory = await eventCategoryModel.findOne({
      _id: new Types.ObjectId(_id),
    });
    if (!findCategory) {
      return res.json({
        meta: { msg: "category not found.", status: false },
      });
    }
    if (findCategory.type === "ROOT") {
      const findSubCategory = await eventCategoryModel.find({
        parentId: new Types.ObjectId(_id),
      });
      if (findSubCategory.length) {
        return res.json({
          meta: {
            msg: "Category found in the category. so can't delete",
            status: false,
          },
        });
      }
    } else {
      const findCategoryInProduct = await productModel.find({
        subCategoryId: new Types.ObjectId(_id),
      });
      if (findCategoryInProduct.length) {
        return res.json({
          meta: {
            msg: "Sub category found in the product. so can't delete",
            status: false,
          },
        });
      }
    }
    const deleteCategory = await eventCategoryModel.deleteOne({
      _id: new Types.ObjectId(_id),
    });
    if (deleteCategory.deletedCount > 0) {
      return res.json({
        meta: {
          msg: `${
            findCategory.type === "ROOT" ? "Category" : "Sub category"
          } deleted Successfully.`,
          status: true,
        },
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
  addCategory,
  categoryList,
  subCategoryList,
  getCategoryById,
  updateCategory,
  changeCategoryStatus,
  deleteCategory,
};
