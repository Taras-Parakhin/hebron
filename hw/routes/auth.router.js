const {Router} = require('express');

const {authController: {login, refresh, logout}} = require('../controllers');
const {
  authMiddleware: {
    isLoginDateValid,
    checkAccessToken,
    checkRefreshToken
  },
  userMiddleware: {getUserDynamically}
} = require('../middlewares');

const authRouter = Router();

authRouter.post('/login', isLoginDateValid, getUserDynamically('email'), login);
authRouter.post('/refresh', checkRefreshToken, refresh);
authRouter.post('/logout', checkAccessToken, logout);

module.exports = authRouter;
