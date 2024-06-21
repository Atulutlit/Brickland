const Joi = require("joi");

const eventJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    categoryId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .length(24)
      .required()
      .messages({
        "any.required": "category id is required",
        "string.pattern.base": `Invalid _id`,
      }),
    title: Joi.string().required().messages({
      "any.required": "title is required",
    }),
    description: Joi.string().optional().messages({
      "any.required": "Description is required",
    }),
    location: Joi.string().required().messages({
      "any.required": "Location is required",
    }),
    link: Joi.string().required().messages({
      "any.required": "link is required",
    }),
    eventDate: Joi.number().required().messages({
      "any.required": "Event date is required",
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
  eventJoiMiddleware,
  changeStatusJoiMiddleware,
};
