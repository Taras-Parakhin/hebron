let Car = require("../dataBase/Car.model");

module.exports = {
    getAllCars: async (req, res) => {
        const cars = await Car.find();

        res.json(cars);
    },

    getCarById: async (req, res) => {
        const {carId} = req.params;
        const car = await Car.findById(carId);

        res.json(car);
    },

    createCar: async (req, res) => {
        const createCar = await Car.create(req.body);

        res.json(createCar);
    },

    updateCar: async (req, res) => {
        const {carId} = req.params;
        const updateCar = await Car.updateOne(
            {_id: carId},
            {$set: req.body}
        );

        // Object.assign(DBCars[carId], req.body);

        res.json(updateCar);
    },

    deleteCar: async (req, res) => {
        const {carId} = req.params;
        const deleteCar = await Car.deleteOne({_id: carId});

        // DBCars = DBCars.filter((_, index) => Number(userId) !== index);

        res.json(deleteCar);
    }
}