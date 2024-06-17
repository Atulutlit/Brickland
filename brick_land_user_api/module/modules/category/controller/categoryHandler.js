"use strict";
const { categoryModel } = require("../model/categoryModel");
const { Types } = require("mongoose");

const categoryList = async function (req, res) {
  try {
    const { type, searchKey } = req.query;
    let contentPerPage = Number(req.query.contentPerPage || 0);
    let page = Number(req.query.page || 0);
    const findQuery = {
      ...(type && { type: type.toUpperCase() }),
      status: "ACTIVE",
      ...(searchKey && {
        $or: [
          { categoryName: { $regex: `${searchKey}.*`, $options: "i" } },
          { description: { $regex: `${searchKey}.*`, $options: "i" } },
          { url: { $regex: `${searchKey}.*`, $options: "i" } },
          { metaDescription: { $regex: `${searchKey}.*`, $options: "i" } },
          { metaKeyword: { $regex: `${searchKey}.*`, $options: "i" } },
          { metaTitle: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
    };
    const categoryListData = await categoryModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .limit(contentPerPage)
      .skip(contentPerPage * page - contentPerPage);
    if (categoryListData.length) {
      const total = await categoryModel.countDocuments(findQuery);
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
        meta: { msg: "List not found", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const subCategoryList = async function (req, res) {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.json({
        meta: { msg: "Parameter Missing", status: false },
      });
    }
    let contentPerPage = Number(req.query.contentPerPage || 0);
    let page = Number(req.query.page || 0);
    const { searchKey } = req.query;
    const subCategoryListData = await categoryModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "parentId",
          as: "subCategory",
        },
      },
      {
        $project: {
          subCategory: {
            $filter: {
              input: "$subCategory",
              as: "sub",
              cond: {
                $eq: ["$$sub.status", "ACTIVE"],
              },
            },
          },
        },
      },
      {
        $unwind: {
          path: "$subCategory",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          categoryId: "$subCategory.categoryId",
          categoryName: "$subCategory.categoryName",
          categoryImg: "$subCategory.categoryImg",
          logoImg: "$subCategory.logoImg",
          description: "$subCategory.description",
          returnDescription: "$subCategory.returnDescription",
          cancelDescription: "$subCategory.cancelDescription",
          url: "$subCategory.url",
          commission: "$subCategory.commission",
          status: "$subCategory.status",
          type: "$subCategory.type",
          parentId: "$subCategory.parentId",
          isCompare: "$subCategory.isCompare",
          tax: "$subCategory.tax",
          isFeaturedWeb: "$subCategory.isFeaturedWeb",
          isCategoryWebNav: "$subCategory.isCategoryWebNav",
          isCategoryMobile: "$subCategory.isCategoryMobile",
          isCategoryMobileNav: "$subCategory.isCategoryMobileNav",
          createdAt: "$subCategory.createdAt",
        },
      },
      {
        $match: {
          status: "ACTIVE",
          ...(searchKey && {
            $or: [
              { categoryName: { $regex: `${searchKey}.*`, $options: "i" } },
              { description: { $regex: `${searchKey}.*`, $options: "i" } },
              { url: { $regex: `${searchKey}.*`, $options: "i" } },
              { metaDescription: { $regex: `${searchKey}.*`, $options: "i" } },
              { metaKeyword: { $regex: `${searchKey}.*`, $options: "i" } },
              { metaTitle: { $regex: `${searchKey}.*`, $options: "i" } },
            ],
          }),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    if (
      subCategoryListData.length &&
      Object.keys(subCategoryListData[0]).length !== 0
    ) {
      return res.json({
        meta: { msg: "Category list found successfully", status: true },
        data: subCategoryListData,
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

const getCategoryById = async function (req, res) {
  try {
    const { _id } = req.params;
    const categoryData = await categoryModel.findOne({
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
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  categoryList,
  subCategoryList,
  getCategoryById,
};
