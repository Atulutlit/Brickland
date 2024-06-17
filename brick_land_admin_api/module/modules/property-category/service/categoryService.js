const Joi = require("joi");

const addCategoryJoiMiddleware = function (req, res, next) {
  const commonKeys = {
    type: Joi.string()
      .required()
      .valid("ROOT", "PARENT", "CHILD", "SUBCHILD")
      .messages({
        "any.required": "Type is required",
      }),
    categoryName: Joi.string().required().messages({
      "any.required": "Category name is required",
    }),
    slug: Joi.string().optional().messages({
      "any.required": "Slug is required",
    }),
    categoryImg: Joi.string().required().messages({
      "any.required": "Category image is required",
    }),
    description: Joi.string().required().messages({
      "any.required": "Description is required",
    }),
    url: Joi.string().optional().messages({
      "any.required": "Description is required",
    }),
  };
  const addCategoryModel = Joi.object().keys({
    ...commonKeys,
    parentId: Joi.string().optional().allow("").messages({
      "any.required": "Parent id is required",
    }),
  });
  const addSubCategoryModel = Joi.object().keys({
    ...commonKeys,
    parentId: Joi.string().required().messages({
      "any.required": "Parent id is required",
    }),
  });
  let result = "";
  if (req.body.type === "ROOT") {
    result = addCategoryModel.validate(req.body);
  } else {
    result = addSubCategoryModel.validate(req.body);
  }
  if (result.error) {
    return res.json({
      meta: { msg: result.error.details[0].message, status: false },
    });
  } else {
    return next();
  }
};

const updateCategoryJoiMiddleware = function (req, res, next) {
  const updateCategoryModel = Joi.object().keys({
    _id: Joi.string().required().messages({
      "any.required": "Category id is required",
    }),
    categoryName: Joi.string().required().messages({
      "any.required": "Category name is required",
    }),
    slug: Joi.string().optional().messages({
      "any.required": "Slug is required",
    }),
    categoryImg: Joi.string().required().messages({
      "any.required": "Category image is required",
    }),
    description: Joi.string().required().messages({
      "any.required": "Description is required",
    }),
    url: Joi.string().optional().messages({
      "any.required": "Description is required",
    }),
    parentId: Joi.string().optional().allow("").messages({
      "any.required": "Parent id is required",
    }),
  });
  let result = updateCategoryModel.validate(req.body);
  if (result.error) {
    return res.json({
      meta: { msg: result.error.details[0].message, status: false },
    });
  } else {
    return next();
  }
};

const changeCategoryStatusJoiMiddleware = function (req, res, next) {
  const updateCategoryModel = Joi.object().keys({
    _id: Joi.string().required().messages({
      "any.required": "Category id is required",
    }),
    status: Joi.string()
      .required()
      .valid("active", "deactive", "ACTIVE", "DEACTIVE")
      .messages({
        "any.required": "status is required",
      }),
  });
  let result = updateCategoryModel.validate(req.body);
  if (result.error) {
    return res.json({
      meta: { msg: result.error.details[0].message, status: false },
    });
  } else {
    return next();
  }
};

module.exports = {
  addCategoryJoiMiddleware,
  updateCategoryJoiMiddleware,
  changeCategoryStatusJoiMiddleware,
};
