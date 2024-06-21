const Joi = require("joi");

const faqJoiMiddleware = function (req, res, next) {
  const joiModel = Joi.object().keys({
    question: Joi.string().required().messages({
      "any.required": "Question is required",
    }),
    answer: Joi.string().required().messages({
      "any.required": "Answer is required",
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
  faqJoiMiddleware,
  changeStatusJoiMiddleware,
};
