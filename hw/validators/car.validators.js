const Joi = require('joi');

const {CURRENT_YEAR} = require('../constants');

const newCarJoiSchema = Joi.object({
  model: Joi.string().min(2).max(50).lowercase().trim().required(),
  year: Joi.number().min(1900).max(CURRENT_YEAR).required(),
  color: Joi.string()
});

module.exports = {
  newCarJoiSchema
}
