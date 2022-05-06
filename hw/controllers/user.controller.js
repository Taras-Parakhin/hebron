let User = require("../dataBase/User.model");

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await User.find();

        res.json(users);
    },

    getUserById: async (req, res) => {
        const {userId} = req.params;
        const user = await User.findById(userId);

        res.json(user);
    },

    createUser: async (req, res) => {
        const createUser = await User.create(req.body);

        res.json(createUser);
    },

    updateUser: async (req, res) => {
        const {userId} = req.params;
        const updateUser = await User.updateOne(
            {_id: userId},
            {$set: req.body}
        );

        res.json(updateUser);
    },

    deleteUser: async (req, res) => {
        const {userId} = req.params;
        const deleteUser = await User.deleteOne({_id: userId});

        res.json(deleteUser);
    }
}