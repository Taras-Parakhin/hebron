const {authService} = require('../service');
const {OAuth} = require('../dataBase');

module.exports = {
  login: async (req, res, next) => {
    try {
      const {user, body: {password}} = req;

      await authService.comparePasswords(user.password, password);

      const tokenPair = authService.generateTokenPair({userId: user._id});

      await OAuth.create({user_id: user._id, ...tokenPair});

      res.json({
        ...tokenPair,
        user
      });

    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const {authUser} = req;

      const tokenPair = authService.generateTokenPair({userId: authUser._id});

      await OAuth.create({user_id: authUser._id, ...tokenPair});

      res.json({
        ...tokenPair,
        authUser
      });

    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      await OAuth.deleteMany({user_id: req.authUser._id});

      res.json('Ok');

    } catch (e) {
      next(e);
    }
  }
};
