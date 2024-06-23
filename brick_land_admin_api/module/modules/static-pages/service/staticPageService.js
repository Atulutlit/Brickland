const Joi = require("joi");

const staticPageJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    title: Joi.string().required().messages({
      "any.required": "Title is required",
    }),
    url: Joi.string().required().messages({
      "any.required": "Url is required",
    }),
    description: Joi.string().required().messages({
      "any.required": "Description is required",
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
  staticPageJoiMiddleware,
  changeStatusJoiMiddleware,
};
