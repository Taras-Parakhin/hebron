const {Car} = require('../dataBase');

module.exports = {
  getAllCars: async (req, res, next) => {
    try {
      const {limit = 20, page = 1} = req.query;
      const skip = (page - 1) * limit;

      const cars = await Car.find().limit(limit).skip(skip);
      const count = await Car.count({})

      res.json({
        page,
        perPage: limit,
        count,
        data: cars
      });
    } catch (e) {
      next(e);
    }
  },

  getCarById: (req, res, next) => {
    try {
      res.json(req.car);
    } catch (e) {
      next(e);
    }
  },

  createCar: async (req, res, next) => {
    try {
      const createCar = await Car.create(req.body);

      res.json(createCar);
    } catch (e) {
      next(e);
    }
  },

  updateCar: async (req, res, next) => {
    try {
      const {carId} = req.params;
      const updateCar = await Car.updateOne(
        {_id: carId},
        {$set: req.body}
      );

      res.json(updateCar);
    } catch (e) {
      next(e);
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      const {carId} = req.params;
      const deleteCar = await Car.deleteOne({_id: carId});

      res.json(deleteCar);
    } catch (e) {
      next(e);
    }
  }
}
