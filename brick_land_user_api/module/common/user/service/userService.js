const Joi = require("joi");

const sendOTPJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    mobile: Joi.string()
      .regex(/^[0-9]{10}$/)
      .length(10)
      .required()
      .messages({
        "any.required": "mobile is required",
        "string.pattern.base": `Invalid mobile number`,
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

const verifyOTPJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    mobile: Joi.string()
      .regex(/^[0-9]{10}$/)
      .length(10)
      .required()
      .messages({
        "any.required": "mobile is required",
        "string.pattern.base": `Invalid mobile number`,
      }),
    otp: Joi.string()
      .regex(/^[0-9]{6}$/)
      .length(6)
      .required()
      .messages({
        "any.required": "OTP is required",
        "string.pattern.base": `Invalid OTP`,
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

const updateUserJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    _id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .length(24)
      .required()
      .messages({
        "any.required": "_id is required",
        "string.pattern.base": `Invalid _id`,
      }),
    mobile: Joi.string()
      .regex(/^[0-9]{10}$/)
      .length(10)
      .required()
      .messages({
        "any.required": "Mobile is required",
        "string.pattern.base": `Invalid mobile number`,
      }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    email: Joi.string().required().messages({
      "any.required": "Email is required",
    }),
    country: Joi.string().required().messages({
      "any.required": "Country is required",
    }),
    state: Joi.string().required().messages({
      "any.required": "State is required",
    }),
    district: Joi.string().required().messages({
      "any.required": "District is required",
    }),
    city: Joi.string().required().messages({
      "any.required": "City is required",
    }),
    pincode: Joi.number().required().messages({
      "any.required": "Pincode is required",
    }),
    address: Joi.string().required().messages({
      "any.required": "Address is required",
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
  sendOTPJoiMiddleware,
  verifyOTPJoiMiddleware,
  updateUserJoiMiddleware,
};
