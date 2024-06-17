const Joi = require("joi");

const orderJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    addressId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .length(24)
      .required()
      .messages({
        "any.required": "Address id is required",
        "string.pattern.base": `Invalid id`,
      }),
    paymentMethod: Joi.string().required().valid("POD").messages({
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
  orderJoiMiddleware,
};
