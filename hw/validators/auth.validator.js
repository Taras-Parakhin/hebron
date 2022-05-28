const Joi = require('joi');

const {constants} = require('../constants');

const loginJoiSchema = Joi.object({
  email: Joi.string().regex(constants.EMAIL_REGEXP).trim().lowercase().required(),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required()
});

const emailJoiSchema = Joi.object({
  email: Joi.string().regex(constants.EMAIL_REGEXP).trim().lowercase().required()
});

// const passwordJoiSchema = Joi.object({
//   password: Joi.string().regex(constants.PASSWORD_REGEXP).required()
// });

const forgotPasswordJoiSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required()
});

const changePasswordJoiSchema = Joi.object({
  // token: Joi.string().required(),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required(),
  newPassword: Joi.string().regex(constants.PASSWORD_REGEXP).required()
});

module.exports = {
  loginJoiSchema,
  emailJoiSchema,
  // passwordJoiSchema,
  forgotPasswordJoiSchema,
  changePasswordJoiSchema
};
