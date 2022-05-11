const {Router} = require('express');

const {carController} = require('../controllers');
const {
  carMiddleware: {
    newCarValidator,
    validId,
    existId
  }
} = require('../middlewares');

const carRouter = Router();

carRouter.get('/', carController.getAllCars);
carRouter.post('/', newCarValidator, carController.createCar);

carRouter.all('/:carId', validId, existId);
carRouter.get('/:carId', carController.getCarById);
carRouter.put('/:carId', carController.updateCar);
carRouter.delete('/:carId', carController.deleteCar);

module.exports = carRouter;
