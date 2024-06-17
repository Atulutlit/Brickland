"use strict";
const { Types } = require("mongoose");
const { productModel } = require("../model/productModel");

const productList = async function (req, res) {
  try {
    const { searchKey, categoryId, subCategoryId, sort, isBestSeller } =
      req.query;
    let contentPerPage = Number(req.query.contentPerPage || 100000);
    let page = Number(req.query.page || 1);
    const findQuery = {
      ...(isBestSeller && isBestSeller == "true" && { isBestSeller: true }),
      status: "ACTIVE",
      ...(categoryId && { categoryId: new Types.ObjectId(categoryId) }),
      ...(subCategoryId && {
        subCategoryId: new Types.ObjectId(subCategoryId),
      }),
      ...(searchKey && {
        $or: [
          { productId: { $regex: `${searchKey}.*`, $options: "i" } },
          { productName: { $regex: `${searchKey}.*`, $options: "i" } },
          { shortDescription: { $regex: `${searchKey}.*`, $options: "i" } },
          { description: { $regex: `${searchKey}.*`, $options: "i" } },
          { tags: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
    };
    let sortQuery = {
      ...(sort && sort === "new" && { createdAt: -1 }),
      ...(sort && sort === "old" && { createdAt: 1 }),
      ...((!sort || (sort !== "new" && sort !== "old")) && { createdAt: -1 }),
    };
    const listData = await productModel.aggregate(
      await getProductListPipeline(findQuery, sortQuery, page, contentPerPage)
    );
    if (listData.length && listData[0].data.length) {
      return res.json({
        meta: { msg: "Product list found successfully", status: true },
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

const getProductListPipeline = async function (
  findQuery,
  sortQuery,
  page,
  contentPerPage
) {
  return [
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
      $match: findQuery,
    },
    {
      $sort: sortQuery,
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
  ];
};

const productDetails = async function (req, res) {
  try {
    const { productId } = req.params;
    const findQuery = { status: "ACTIVE", _id: new Types.ObjectId(productId) };
    const productDetails = await productModel.aggregate(
      await getProductDetailsPipeline(findQuery)
    );
    if (productDetails.length) {
      return res.json({
        meta: { msg: "Product details found successfully", status: true },
        data: productDetails[0],
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

const getProductDetailsPipeline = async function (findQuery) {
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
    // {
    //   '$lookup': {
    //     'from': 'categories',
    //     'localField': 'subCategoryId',
    //     'foreignField': '_id',
    //     'as': 'subCategory'
    //   }
    // }, {
    //   '$unwind': {
    //     'path': '$subCategory',
    //     'preserveNullAndEmptyArrays': true
    //   }
    // }
  ];
};

module.exports = {
  productList,
  productDetails,
};
