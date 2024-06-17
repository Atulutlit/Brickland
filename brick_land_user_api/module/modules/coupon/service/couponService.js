const Joi = require("joi");

const couponJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    code: Joi.string().required().messages({
      "any.required": "Coupon code is required",
    }),
    description: Joi.string().required().messages({
      "any.required": "coupon description is required",
    }),
    conditions: Joi.string().optional().messages({
      "any.required": "Conditions is required",
    }),
    type: Joi.string()
      .required()
      .valid("ABSOLUTE", "PERCENTAGE", "absolute", "percentage")
      .messages({
        "any.required": "Coupon type is required",
      }),
    discount: Joi.number().integer().positive().required().messages({
      "any.required": "Discount is required",
    }),
    maxDiscount: Joi.number().integer().positive().required().messages({
      "any.required": "Max discount is required",
    }),
    minOrderAmount: Joi.number().integer().positive().required().messages({
      "any.required": "Min discount is required",
    }),
    maxOrderAmount: Joi.number().integer().positive().required().messages({
      "any.required": "Max order amount is required",
    }),
    maxOrderItems: Joi.number().integer().positive().required().messages({
      "any.required": "Max order items is required",
    }),
    startDate: Joi.number().integer().positive().required().messages({
      "any.required": "Start date is required",
    }),
    endDate: Joi.number().integer().positive().required().messages({
      "any.required": "End date is required",
    }),
    useCount: Joi.number().integer().positive().required().messages({
      "any.required": "Use count is required",
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

module.exports = {
  couponJoiMiddleware,
  changeStatusJoiMiddleware,
};
