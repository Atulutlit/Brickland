const Joi = require("joi");

const addProductJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    productId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .length(24)
      .required()
      .messages({
        "any.required": "product id is required",
        "string.pattern.base": `Invalid id`,
      }),
    quantity: Joi.number().integer().required().positive().messages({
      "any.required": "Quantity is required",
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

const applyCouponJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    code: Joi.string().required().messages({
      "any.required": "Code is required",
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
  addProductJoiMiddleware,
  applyCouponJoiMiddleware,
};
