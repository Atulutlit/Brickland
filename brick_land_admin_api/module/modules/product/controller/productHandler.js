"use strict";
const { Types } = require("mongoose");
const { get: _get } = require("lodash");
const moment = require("moment/moment");
const { productModel } = require("../model/productModel");
const slugify = require("slugify");
const { categoryModel } = require("../../blog-category/model/categoryModel");
const {
  getCustomProductId,
} = require("../../../common/counter/controller/counterHandler");

const slugifyConfig = {
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
};

const addProduct = async function (req, res) {
  try {
    const {
      categoryId,
      // subCategoryId,
      productName,
      description,
      shortDescription,
      productImg,
      price,
      specialPrice,
      benefits,
      isBestSeller,
      vitamin,
      minerals,
      calories,
      protein,
      carbohydrates,
      fat,
      fiber,
      metaTitle,
      metaDescription,
      metaKeyword,
      weight,
      stock,
    } = req.body;
    const findProduct = await productModel.findOne({ productName });
    if (findProduct) {
      return res.json({
        meta: { msg: "Product already exist with this name", status: false },
      });
    }
    const findCategory = await categoryModel.findOne({
      _id: new Types.ObjectId(categoryId),
    });
    if (!findCategory) {
      return res.json({
        meta: { msg: "Category not found.", status: false },
      });
    }
    // const findSubCategory = await categoryModel.findOne({
    //   parentId: new Types.ObjectId(categoryId),
    //   _id: new Types.ObjectId(subCategoryId),
    // });
    // if (!findSubCategory) {
    //   return res.json({
    //     meta: { msg: "Sub category not found.", status: false },
    //   });
    // }

    const productId = await getCustomProductId();
    const addObj = {
      productId,
      categoryId,
      // subCategoryId,
      url: slugify(productName, slugifyConfig),
      productName,
      productImg,
      description,
      shortDescription,
      price,
      specialPrice,
      benefits,
      isBestSeller,
      vitamin,
      minerals,
      calories,
      protein,
      carbohydrates,
      fat,
      fiber,
      weight,
      stock,
      ...(metaTitle && { metaTitle }),
      ...(metaDescription && { metaDescription }),
      ...(metaKeyword && { metaKeyword }),
    };
    const addData = await productModel.create(addObj);
    if (addData) {
      return res.json({
        meta: { msg: "Product added successfully.", status: true },
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

const productList = async function (req, res) {
  try {
    const { status, searchKey, categoryId, subCategoryId, startDate, endDate } =
      req.query;
    let contentPerPage = Number(req.query.contentPerPage || 100000);
    let page = Number(req.query.page || 1);
    const findQuery = {
      ...(status && { status: status.toUpperCase() }),
      ...(categoryId && { categoryId: new Types.ObjectId(categoryId) }),
      ...(subCategoryId && {
        subCategoryId: new Types.ObjectId(subCategoryId),
      }),
      ...(searchKey && {
        $or: [
          { productId: { $regex: `${searchKey}.*`, $options: "i" } },
          { productName: { $regex: `${searchKey}.*`, $options: "i" } },
          { shortDescription: { $regex: `${searchKey}.*`, $options: "i" } },
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
    const listData = await productModel.aggregate(
      await getProductListPipeline(findQuery, page, contentPerPage)
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
    console.log(error);
    return res.status(500).json({
      meta: { msg: error.message, status: false },
    });
  }
};

const getProductListPipeline = async function (
  findQuery,
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
      $lookup: {
        from: "categories",
        localField: "subCategoryId",
        foreignField: "_id",
        as: "subCategory",
      },
    },
    {
      $unwind: {
        path: "$subCategory",
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

const productDetails = async function (req, res) {
  try {
    const { _id } = req.params;
    const findQuery = { _id: new Types.ObjectId(_id) };
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
    console.log(error);
    return res.status(500).json({
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
    {
      $lookup: {
        from: "categories",
        localField: "subCategoryId",
        foreignField: "_id",
        as: "subCategory",
      },
    },
    {
      $unwind: {
        path: "$subCategory",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];
};

const updateProduct = async function (req, res) {
  try {
    const { _id } = req.params;
    const {
      categoryId,
      // subCategoryId,
      productName,
      description,
      shortDescription,
      productImg,
      price,
      specialPrice,
      benefits,
      isBestSeller,
      vitamin,
      minerals,
      calories,
      protein,
      carbohydrates,
      fat,
      fiber,
      metaTitle,
      metaDescription,
      metaKeyword,
      stock,
    } = req.body;

    const findProduct = await productModel.findOne({
      _id: new Types.ObjectId(_id),
    });
    if (!findProduct) {
      return res.json({
        meta: { msg: "Product not found.", status: false },
      });
    }
    const findProductName = await productModel.findOne({
      productName,
      _id: new Types.ObjectId(_id),
    });
    if (!findProductName) {
      const findProductNameAgain = await productModel.findOne({ productName });
      if (findProductNameAgain) {
        return res.json({
          meta: {
            msg: "Product already exist with this title.",
            status: false,
          },
        });
      }
    }
    const findCategory = await categoryModel.findOne({
      _id: new Types.ObjectId(categoryId),
    });
    if (!findCategory) {
      return res.json({
        meta: { msg: "Category not found.", status: false },
      });
    }
    // const findSubCategory = await categoryModel.findOne({
    //   parentId: new Types.ObjectId(categoryId),
    //   _id: new Types.ObjectId(subCategoryId),
    // });
    // if (!findSubCategory) {
    //   return res.json({
    //     meta: { msg: "Sub category not found.", status: false },
    //   });
    // }
    const updateObj = {
      categoryId,
      // subCategoryId,
      url: slugify(productName, slugifyConfig),
      productName,
      productImg,
      description,
      shortDescription,
      price,
      specialPrice,
      benefits,
      isBestSeller,
      vitamin,
      minerals,
      calories,
      protein,
      carbohydrates,
      fat,
      fiber,
      stock,
      ...(metaTitle && { metaTitle }),
      ...(metaDescription && { metaDescription }),
      ...(metaKeyword && { metaKeyword }),
    };
    const updateProduct = await productModel.findByIdAndUpdate(
      new Types.ObjectId(_id),
      { $set: updateObj }
    );
    if (updateProduct) {
      return res.json({
        meta: { msg: "Product updated successfully.", status: true },
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
    const updateStatus = await productModel.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      { $set: pageStatus }
    );
    if (updateStatus) {
      return res.json({
        meta: { msg: "Product status changed Successfully.", status: true },
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

const changeState = async (req, res) => {
  try {
    const { _id, state } = req.body;
    const pageState = {
      ...(state.toLowerCase() === "approved" && { status: "APPROVED" }),
      ...(state.toLowerCase() === "rejected" && { status: "REJECTED" }),
    };
    if (!pageState.status) {
      return res.json({
        meta: {
          msg: "Invalid status, Please send a valid state.",
          status: false,
        },
      });
    }
    const updateState = await productModel.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      { $set: pageState }
    );
    if (updateState) {
      return res.json({
        meta: { msg: "Product state changed Successfully.", status: true },
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

const deleteProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    // check for the cart and order for the product
    const deleteProduct = await productModel.deleteOne({
      _id: new Types.ObjectId(_id),
    });
    if (deleteProduct.deletedCount > 0) {
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

const addProductStock = async (req, res) => {
  try {
    const { _id, stock } = req.body;
    const updateStock = await productModel.findByIdAndUpdate(
      new Types.ObjectId(_id),
      { $set: { stock } }
    );
    if (updateStock) {
      return res.json({
        meta: { msg: "Product stock added Successfully.", status: true },
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

const removeProductStock = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateStock = await productModel.findByIdAndUpdate(
      new Types.ObjectId(_id),
      { $set: { stock: 0 } }
    );
    if (updateStock) {
      return res.json({
        meta: { msg: "Product stock removed Successfully.", status: true },
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
  addProduct,
  productList,
  productDetails,
  updateProduct,
  changeStatus,
  changeState,
  deleteProduct,
  addProductStock,
  removeProductStock,
};
