const Car = require('../dataBase/Car.model');
const ApiError = require('../error/apiError');

const emptyField = (req, res, next) => {
  try {
    const {model, year} = req.body;

    if (!model || !year) {
      next(new ApiError('All fields must be filled', 400));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

const validYear = (req, res, next) => {
  try {
    const {year} = req.body;

    if (!Number(year) && year < 1900 && year > 2022) {
      next(new ApiError('Not valid year', 400));
      return;
    }

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
  emptyField,
  validYear,
  validId,
  existId
};
