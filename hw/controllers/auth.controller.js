const {authService, emailService} = require('../service');
const {emailActionsEnum, actionTypeEnum} = require('../constants');
const {OAuth, ActionToken, User} = require('../dataBase');
const {FRONTEND_URL} = require('../config/config');

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
  },

  forgotPassword: async (req, res, next) => {
    try {
      const {_id, email, name} = req.user;
      const token = authService.generateActionToken({userId: _id});
      const forgotPasswordUrl = `${FRONTEND_URL}/password/forgot?token=${token}`;

      await ActionToken.create({
        token,
        user_id: _id,
        actionType: actionTypeEnum.FORGOT_PASSWORD
      });
      await emailService.sendMail(
        email,
        emailActionsEnum.FORGOT_PASSWORD,
        {forgotPasswordUrl, userName: name});

      res.json('Ok');
    } catch (e) {
      next(e);
    }
  },

  setPasswordAfterForgot:  async (req, res, next) => {
    try {
      const {user: {_id}, body: {password, token}} = req;
      const newPassword = await authService.hashPassword(password);

      await User.updateOne({_id}, {password: newPassword});
      await OAuth.deleteMany({user_id: _id});
      await ActionToken.deleteOne({token});

      res.json('Ok');
    } catch (e) {
      next(e);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const {authUser: {_id}, body: {newPassword}} = req;
      const password = await authService.hashPassword(newPassword);

      await User.updateOne({_id}, {password});

      res.json('Ok');
    } catch (e) {
      next(e)
    }
  }
};
