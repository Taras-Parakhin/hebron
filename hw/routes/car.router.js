const {Router} = require('express');

const {carController} = require('../controllers');
const {
  carMiddleware: {
    createCarValidator,
    updateCarValidator,
    validId,
    existId
  },
  queryMiddleware
} = require('../middlewares');

const carRouter = Router();

carRouter.get('/', queryMiddleware.queryValidator, carController.getAllCars);
carRouter.post('/', createCarValidator, carController.createCar);

carRouter.all('/:carId', validId, existId);
carRouter.get('/:carId', carController.getCarById);
carRouter.put('/:carId', updateCarValidator, carController.updateCar);
carRouter.delete('/:carId', carController.deleteCar);

module.exports = carRouter;
