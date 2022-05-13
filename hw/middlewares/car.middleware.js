const Car = require('../dataBase/Car.model');
const ApiError = require('../error/apiError');
const {carJoiSchemas} = require('../validators');
const {
  errorsEnum: {
    NOT_VALID_ID,
    OBJ_NOT_FOUND,
  },
  statusErrorEnum: {
    BAD_REQUEST,
    NOT_FOUND,
  }
} = require('../constants');

const createCarValidator = (req, res, next) => {
  try {
    const {error, value} = carJoiSchemas.createCarJoiSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, BAD_REQUEST));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
};

const updateCarValidator = (req, res, next) => {
  try {
    const {error, value} = carJoiSchemas.updateCarJoiSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, BAD_REQUEST));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
};

const validId = (req, res, next) => {
  try {
    const {carId} = req.params;

    if (carId.length !== 24) {
      next(new ApiError(NOT_VALID_ID, BAD_REQUEST));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

const existId = async (req, res, next) => {
  try {
    const {carId} = req.params;
    const carById = await Car.findById(carId);

    if (!carById) {
      next(new ApiError(OBJ_NOT_FOUND, NOT_FOUND));
      return;
    }

    req.car = carById;

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  createCarValidator,
  updateCarValidator,
  validId,
  existId
};
