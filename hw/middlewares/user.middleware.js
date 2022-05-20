const User = require('../dataBase/User.model');
const ApiError = require('../error/apiError');
const {userJoiSchemas} = require('../validators');
const {
  errorsEnum: {
    NOT_VALID_ID,
    OBJ_NOT_FOUND,
    CONFLICT_EMAIL
  },
  statusErrorEnum: {
    BAD_REQUEST,
    NOT_FOUND,
    CONFLICT
  }
} = require('../constants');

const createUserValidator = (req, res, next) => {
  try {
    const {error, value} = userJoiSchemas.createUserJoiSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, BAD_REQUEST));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
};

const updateUserValidator = (req, res, next) => {
  try {
    const {error, value} = userJoiSchemas.updateUserJoiSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, BAD_REQUEST));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
};

const duplicateEmail = async (req, res, next) => {
  try {
    const {email} = req.body;
    const isUserPresent = await User.findOne({email: email.toLocaleLowerCase().trim()});

    if (isUserPresent) {
      next(new ApiError(CONFLICT_EMAIL, CONFLICT));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

const validId = (req, res, next) => {
  try {
    const {userId} = req.params;

    if (userId.length !== 24) {
      next(new ApiError(NOT_VALID_ID, BAD_REQUEST));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

const getUserDynamically = (paramName = '_id', where = 'body', dataBaseField = paramName) => async (req, res, next) => {
  try {
    const findObject = req[where];

    if (!findObject || typeof findObject !== 'object') {
      next(new ApiError('Wrong search param in middleware'));
      return;
    }

    const param = findObject[paramName];
    const user = await User.findOne({[dataBaseField]: param}).select('+password');

    if (!user) {
      next(new ApiError(OBJ_NOT_FOUND, NOT_FOUND));
      return;
    }

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUserDynamically,
  createUserValidator,
  updateUserValidator,
  duplicateEmail,
  validId
};
