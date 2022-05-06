let Car = require("../dataBase/Car.model");

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const cars = await Car.find();

            res.json(cars);
        } catch (e) {
            res.json(e.message);
        }
    },

    getCarById: async (req, res) => {
        try {
            const {carId} = req.params;
            const car = await Car.findById(carId);

            res.json(car);
        } catch (e) {
            res.json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            const createCar = await Car.create(req.body);

            res.json(createCar);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateCar: async (req, res) => {
        try {
            const {carId} = req.params;
            const updateCar = await Car.updateOne(
                {_id: carId},
                {$set: req.body}
            );

            // Object.assign(DBCars[carId], req.body);

            res.json(updateCar);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const {carId} = req.params;
            const deleteCar = await Car.deleteOne({_id: carId});

            // DBCars = DBCars.filter((_, index) => Number(userId) !== index);

            res.json(deleteCar);
        } catch (e) {
            res.json(e.message);
        }
    }
}