const Car = require('../dataBase/Car.model');

const emptyField = (req, res, next) => {
    try {
        const {model, year} = req.body;

        if (!model || !year) {
            res.json('All fields must be filled');
            return;
        }

        next();
    } catch (e) {
        res.json(e.message);
    }
};

const validYear = (req, res, next) => {
    try {
        const {year} = req.body;

        if (!Number(year) && year < 1900 && year > 2022) {
            res.json('Not valid year');
            return;
        }

        next();
    } catch (e) {
        res.json(e.message);
    }
};

const validId = (req, res, next) => {
    try {
        const {carId} = req.params;

        if (carId.length !== 24) {
            res.json('Not valid id');
            return;
        }

        next();
    } catch (e) {
        res.json(e.message);
    }
};

const existId = async (req, res, next) => {
    try {
        const {carId} = req.params;
        const isIdPresent = await Car.findOne({_id: carId});

        if (!isIdPresent) {
            res.status(400).json('Car is not found');
            return;
        }

        next();
    } catch (e) {
        res.json(e.message);
    }
}

module.exports = {
    emptyField,
    validYear,
    validId,
    existId
};