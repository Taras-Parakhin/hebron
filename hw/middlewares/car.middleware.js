const Car = require('../dataBase/Car.model');
const ApiError = require('../error/apiError');
const {carValidator} = require('../validators');

const newCarValidator = (req, res, next) => {
  try {
    const {error, value} = carValidator.newCarJoiSchema.validate(req.body);

    if (error.message) {
      next(new ApiError(error.details[0].message, 400));
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
      next(new ApiError('Not valid id', 400));
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
      next(new ApiError('Car is not found', 404));
      return;
    }

    req.car = carById;

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  newCarValidator,
  validId,
  existId
};
