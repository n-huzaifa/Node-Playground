const Joi = require("joi");

const userValidation = Joi.object().keys({
  name: Joi.string().required(),
  age: Joi.number().integer().min(1).max(200),
  cars: Joi.array().items(Joi.string()),
});

module.exports = { userValidation };
