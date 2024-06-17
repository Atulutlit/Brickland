const Joi = require("joi");

const productJoiMiddleware = function (req, res, next) {
  const addProductModel = Joi.object().keys({
    categoryId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .length(24)
      .required()
      .messages({
        "any.required": "Category id is required",
        "string.pattern.base": `Invalid category id`,
      }),
    // subCategoryId: Joi.string()
    //   .regex(/^[0-9a-fA-F]{24}$/)
    //   .length(24)
    //   .required()
    //   .messages({
    //     "any.required": "Sub category Id is required",
    //     "string.pattern.base": `Invalid sub category id`,
    //   }),
    productName: Joi.string().required().messages({
      "any.required": "Product name is required",
    }),
    description: Joi.string().required().messages({
      "any.required": "Description is required",
    }),
    shortDescription: Joi.string().required().messages({
      "any.required": "Short description is required",
    }),
    productImg: Joi.array().required().messages({
      "any.required": "Product image is required",
    }),
    price: Joi.number().integer().positive().required().messages({
      "any.required": "Short description is required",
    }),
    specialPrice: Joi.number().integer().positive().required().messages({
      "any.required": "Short description is required",
    }),
    benefits: Joi.string().required().messages({
      "any.required": "Benefits is required",
    }),
    isBestSeller: Joi.boolean().optional().messages({
      "any.required": "Is best seller is required",
    }),
    vitamin: Joi.array().required().messages({
      "any.required": "Vitamin is required",
    }),
    minerals: Joi.array().required().messages({
      "any.required": "Minerals is required",
    }),
    calories: Joi.number().integer().positive().required().messages({
      "any.required": "Calories is required",
    }),
    protein: Joi.number().integer().positive().required().messages({
      "any.required": "Protein is required",
    }),
    carbohydrates: Joi.number().integer().positive().required().messages({
      "any.required": "Carbohydrates is required",
    }),
    fat: Joi.number().integer().positive().required().messages({
      "any.required": "Fat is required",
    }),
    fiber: Joi.number().integer().positive().required().messages({
      "any.required": "Fiber is required",
    }),
    weight: Joi.number().positive().required().messages({
      "any.required": "Fiber is required",
    }),
    stock: Joi.number().integer().positive().required().messages({
      "any.required": "Fiber is required",
    }),
    metaTitle: Joi.string().optional().messages({
      "any.required": "Meta title is required",
    }),
    metaDescription: Joi.string().optional().messages({
      "any.required": "Meta description is required",
    }),
    metaKeyword: Joi.string().optional().messages({
      "any.required": "Meta keyword is required",
    }),
  });
  let result = addProductModel.validate(req.body);
  if (result.error) {
    return res.json({
      meta: { msg: result.error.details[0].message, status: false },
    });
  } else {
    return next();
  }
};

const changeStatusJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    _id: Joi.string().required().messages({
      "any.required": "_id is required",
    }),
    status: Joi.string()
      .required()
      .valid("active", "deactive", "ACTIVE", "DEACTIVE")
      .messages({
        "any.required": "status is required",
      }),
  });
  let result = joiModel.validate(req.body);
  if (result.error) {
    return res.json({
      meta: { msg: result.error.details[0].message, status: false },
    });
  } else {
    return next();
  }
};

const changeStateJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    _id: Joi.string().required().messages({
      "any.required": "_id is required",
    }),
    state: Joi.string()
      .required()
      .valid("approved", "rejected", "APPROVED", "REJECTED")
      .messages({
        "any.required": "state is required",
      }),
  });
  let result = joiModel.validate(req.body);
  if (result.error) {
    return res.json({
      meta: { msg: result.error.details[0].message, status: false },
    });
  } else {
    return next();
  }
};

const addStockJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    _id: Joi.string().required().messages({
      "any.required": "_id is required",
    }),
    stock: Joi.number().integer().positive().required().messages({
      "any.required": "stock is required",
    }),
  });
  let result = joiModel.validate(req.body);
  if (result.error) {
    return res.json({
      meta: { msg: result.error.details[0].message, status: false },
    });
  } else {
    return next();
  }
};

module.exports = {
  productJoiMiddleware,
  changeStatusJoiMiddleware,
  changeStateJoiMiddleware,
  addStockJoiMiddleware,
};
