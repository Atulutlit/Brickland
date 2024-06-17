const Joi = require("joi");

const addCallBackJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    firstName: Joi.string().required().messages({
      "any.required": "first name is required",
    }),
    lastName: Joi.string().required().messages({
      "any.required": "Last name is required",
    }),
    email: Joi.string().required().messages({
      "any.required": "email is required",
    }),
    mobile: Joi.string().required().messages({
      "any.required": "mobile is required",
    }),
    comment: Joi.string().required().messages({
      "any.required": "comment is required",
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
  addCallBackJoiMiddleware,
};
