const {queryJoiSchemas} = require('../validators');
const ApiError = require('../error/apiError');

const queryValidator = (req, res, next) => {
  try {
    const {error} = queryJoiSchemas.queryJoiSchema.validate(req.query);

    if (error) {
      next(new ApiError(error.details[0].message, 400));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  queryValidator
}
