const {Router} = require('express');

const {authController: {
  login,
  refresh,
  logout,
  forgotPassword,
  setPasswordAfterForgot,
  changePassword
}} = require('../controllers');
const {
  authMiddleware: {
    isLoginDateValid,
    checkAccessToken,
    checkRefreshToken,
    validEmail,
    validPassword,
    checkActionToken
  },
  userMiddleware: {getUserDynamically}
} = require('../middlewares');
const {actionTypeEnum: {FORGOT_PASSWORD}} = require("../constants");
const {authJoiSchema: {forgotPasswordJoiSchema}} = require('../validators');


const authRouter = Router();

authRouter.post('/login', isLoginDateValid, getUserDynamically('email'), login);
authRouter.post('/refresh', checkRefreshToken, refresh);
authRouter.post('/logout', checkAccessToken, logout);

authRouter.post('/password/forgot', validEmail, getUserDynamically('email'), forgotPassword);
authRouter.patch('/password/forgot', checkActionToken(FORGOT_PASSWORD, forgotPasswordJoiSchema), setPasswordAfterForgot);
authRouter.patch('/password/change',
  checkAccessToken,
  getUserDynamically('_id', 'authUser'),
  validPassword,
  changePassword);

module.exports = authRouter;
