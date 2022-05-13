const Joi = require('joi');

const queryJoiSchema = Joi.object({
  limit: Joi.number().min(2).max(50),
  page: Joi.number().min(1).max(1000)
});

module.exports = {
  queryJoiSchema
}
