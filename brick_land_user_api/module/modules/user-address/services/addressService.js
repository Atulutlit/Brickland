const Joi = require("joi");

const addressJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    addressType: Joi.string()
      .valid("HOME", "OFFICE", "OTHER", "home", "office", "other")
      .required()
      .messages({
        "any.required": "address type is required",
      }),
    mobile: Joi.number().integer().positive().required().messages({
      "any.required": "mobile is required",
    }),
    pincode: Joi.number().positive().required().messages({
      "any.required": "pincode is required",
    }),
    addressLine1: Joi.string().required().messages({
      "any.required": "address line1 is required",
    }),
    addressLine2: Joi.string().required().messages({
      "any.required": "address line 2 is required",
    }),
    stateName: Joi.string().required().messages({
      "any.required": "state is required",
    }),
    cityName: Joi.string().required().messages({
      "any.required": "City is required",
    }),
    countryName: Joi.string().required().messages({
      "any.required": "Country is required",
    }),
    isDefault: Joi.boolean().required().messages({
      "any.required": "default is required",
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

module.exports = { addressJoiMiddleware };
