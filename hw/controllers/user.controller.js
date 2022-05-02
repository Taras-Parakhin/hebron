let DBUsers = require("../dataBase/users");

module.exports = {
    getAllUsers: (req, res) => {
        res.render('users', {DBUsers});
    },

    getUserById: (req, res) => {
        const {userIndex} = req.params;

        res.json(DBUsers[userIndex]);
    },

    createUser: (req, res) => {
        DBUsers.push(req.body);

        res.json(DBUsers);
    },

    updateUser: (req, res) => {
        const {userIndex} = req.params;

        Object.assign(DBUsers[userIndex], req.body);

        res.json(DBUsers);
    },

    deleteUser: (req, res) => {
        const {userIndex} = req.params;

        DBUsers = DBUsers.filter((_, index) => Number(userIndex) !== index);

        res.json(DBUsers);
    }
}