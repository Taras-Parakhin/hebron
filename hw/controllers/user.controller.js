let User = require("../dataBase/User.model");

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const {userId} = req.params;
            const user = await User.findById(userId);

            res.json(user);
        } catch(e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const createUser = await User.create(req.body);

            res.json(createUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {userId} = req.params;
            const updateUser = await User.updateOne(
                {_id: userId},
                {$set: req.body}
            );

            res.json(updateUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {userId} = req.params;
            const deleteUser = await User.deleteOne({_id: userId});

            res.json(deleteUser);
        } catch (e) {
            res.json(e.message);
        }
    }
}