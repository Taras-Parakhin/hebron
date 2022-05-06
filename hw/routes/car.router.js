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
carRouter.get('/:carId', validId, existId, carController.getCarById);
carRouter.post('/', emptyField, validYear, carController.createCar);
carRouter.put('/:carId', validId, existId, carController.updateCar);
carRouter.delete('/:carId', validId, existId, carController.deleteCar);

module.exports = carRouter;