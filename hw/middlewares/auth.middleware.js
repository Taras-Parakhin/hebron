const {authService} = require('../service');
const {authJoiSchema} = require('../validators');
const {OAuth, ActionToken, User} = require('../dataBase');
const ApiError = require('../error/apiError');
const {tokenTypeEnum} = require("../constants");
const {errorsEnum, statusErrorEnum} = require('../constants');

const checkAccessToken = async (req, res, next) => {
  try {
    const access_token = req.get('Authorization');

    authService.validateToken(access_token);

    const tokenData = await OAuth.findOne({access_token}).populate('user_id');

    if (!tokenData || !tokenData.user_id) {
      next(new ApiError(errorsEnum.NO_VALID_TOKEN, statusErrorEnum.UNAUTHORIZED));
      return;
    }

    req.authUser = tokenData.user_id;

    next();
  } catch (e) {
    next(e);
  }
};

const checkRefreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.get('Authorization');

    authService.validateToken(refresh_token, tokenTypeEnum.REFRESH);

    const tokenData = await OAuth.findOne({refresh_token}).populate('user_id');

    if (!tokenData || !tokenData.user_id) {
      next(new ApiError(errorsEnum.NO_VALID_TOKEN, statusErrorEnum.UNAUTHORIZED));
      return;
    }

    await OAuth.deleteOne({refresh_token});

    req.authUser = tokenData.user_id;

    next();
  } catch (e) {
    next(e);
  }
};

const isLoginDateValid = (req, res, next) => {
  try {
    const {value, error} = authJoiSchema.loginJoiSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
};

const validEmail = (req, res, next) => {
  try {
    const {error, value} = authJoiSchema.emailJoiSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, statusErrorEnum.BAD_REQUEST));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
};

const validPassword = async (req, res, next) => {
  try {
    const {user, body: {password}} = req;
    const {error} = authJoiSchema.changePasswordJoiSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, statusErrorEnum.BAD_REQUEST));
      return;
    }

    await authService.comparePasswords(user.password, password);

    next();
  } catch (e) {
    next(e);
  }
};

const checkActionToken = (actionType, joiSchema) => async (req, res, next) => {
  try {
    const {error} = joiSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, statusErrorEnum.BAD_REQUEST));
      return;
    }

    const {token} = req.body;

    authService.validateToken(token, actionType);

    const tokenData = await ActionToken.findOne({token, actionType}).populate('user_id');

    if (!tokenData || !tokenData.user_id) {
      return next(new ApiError(errorsEnum.NO_VALID_TOKEN, statusErrorEnum.UNAUTHORIZED));
    }

    req.user = tokenData.user_id;

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkAccessToken,
  checkRefreshToken,
  isLoginDateValid,
  validEmail,
  validPassword,
  checkActionToken
}
