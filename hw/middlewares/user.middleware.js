const User = require('../dataBase/User.model');

const emptyField = (req, res, next) => {
    try {
        const {name, email} = req.body;

        if (!name || !email) {
            res.json('All fields must be filled');
            return;
        }

        next();
    } catch (e) {
        res.json(e.message);
    }
};

const validEmail = (req, res, next) => {
    try {
        const {email} = req.body;

        if (!email.includes('@')) {
            res.json('Not valid email');
            return;
        }

        next();
    } catch (e) {
        res.json(e.message);
    }
};

const duplicateEmail = async (req, res, next) => {
    try {
        const {email = ''} = req.body;
        const isUserPresent = await User.findOne({email: email.toLocaleLowerCase().trim()});

        if (isUserPresent) {
            res.status(409).json('User with this email already exists');
            return;
        }

        next();
    } catch (e) {
        res.json(e.message);
    }
};

const validId = (req, res, next) => {
    try {
        const {userId} = req.params;

        if (userId.length !== 24) {
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
        const {userId} = req.params;
        const isIdPresent = await User.findOne({_id: userId});

        if (!isIdPresent) {
            res.status(400).json('User is not found');
            return;
        }

        next();
    } catch (e) {
        res.json(e.message);
    }
}

module.exports = {
    emptyField,
    validEmail,
    duplicateEmail,
    validId,
    existId
};