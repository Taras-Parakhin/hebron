const {Router} = require('express');

const carController = require('../controllers/car.controller');
const {
  emptyField,
  validYear,
  validId,
  existId
} = require('../middlewares/car.middleware');

const carRouter = Router();

carRouter.get('/', carController.getAllCars);
carRouter.post('/', emptyField, validYear, carController.createCar);

carRouter.all('/:carId', validId, existId);
carRouter.get('/:carId', carController.getCarById);
carRouter.put('/:carId', carController.updateCar);
carRouter.delete('/:carId', carController.deleteCar);

module.exports = carRouter;
