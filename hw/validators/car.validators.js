const Joi = require('joi');

const {CURRENT_YEAR} = require('../constants');

const createCarJoiSchema = Joi.object({
  model: Joi.string().alphanum().min(2).max(50).lowercase().trim().required(),
  year: Joi.number().min(1900).max(CURRENT_YEAR).required(),
  color: Joi.string()
});

const updateCarJoiSchema = Joi.object({
  model: Joi.string().alphanum().min(2).max(50).lowercase().trim().required(),
  year: Joi.number().min(1900).max(CURRENT_YEAR).required(),
  color: Joi.string()
});

module.exports = {
  createCarJoiSchema,
  updateCarJoiSchema
}
