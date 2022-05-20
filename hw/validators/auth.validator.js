const Joi = require('joi');

const {constants} = require('../constants');

const loginJoiSchema = Joi.object({
  email: Joi.string().regex(constants.EMAIL_REGEXP).trim().lowercase().required(),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required()
});

module.exports = {
  loginJoiSchema
};
