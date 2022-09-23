const Joi = require("joi");

const signupValidation = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { signupValidation };
