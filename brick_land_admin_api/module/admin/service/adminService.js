const Joi = require("joi");

const adminLogin = function (req, res, next) {
  const joiModel = Joi.object().keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "any.required": "email is required",
      }),
    password: Joi.string().required().messages({
      "any.required": "password is required",
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

const resetAdminPasswordJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    oldPassword: Joi.string().messages({
      "any.required": "password is required",
    }),
    newPassword: Joi.string().messages({
      "any.required": "password is required",
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
  adminLogin,

  resetAdminPasswordJoiMiddleware,
};
