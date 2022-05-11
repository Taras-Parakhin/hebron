const Joi = require('joi');

const {constants} = require('../constants');

const newUserJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(50).required(),
  email: Joi.string().regex(constants.EMAIL_REGEXP).trim().lowercase().required(),
  age: Joi.number().integer().min(6),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required()
});

module.exports = {
  newUserJoiSchema
}
