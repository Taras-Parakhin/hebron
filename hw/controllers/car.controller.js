let DBCars = require("../dataBase/cars");

module.exports = {
    getAllCars: (req, res) => {
        res.render('cars', {DBCars});
    },

    getCarById: (req, res) => {
        const {carIndex} = req.params;

        res.json(DBCars[carIndex]);
    },

    createCar: (req, res) => {
        DBCars.push(req.body);

        res.json(DBCars);
    },

    updateCar: (req, res) => {
        const {userIndex} = req.params;

        Object.assign(DBCars[userIndex], req.body);

        res.json(DBCars);
    },

    deleteCar: (req, res) => {
        const {userIndex} = req.params;

        DBCars = DBCars.filter((_, index) => Number(userIndex) !== index);

        res.json(DBCars);
    }
}