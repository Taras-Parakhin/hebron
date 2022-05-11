const User = require('../dataBase/User.model');
const ApiError = require('../error/apiError');
const {userValidator} = require('../validators');

const newUserValidator = (req, res, next) => {
  try {
    const {error, value} = userValidator.newUserJoiSchema.validate(req.body);

    if (error.message) {
      next(new ApiError(error.details[0].message, 400));
      return;
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
}

const duplicateEmail = async (req, res, next) => {
  try {
    const {email} = req.body;
    const isUserPresent = await User.findOne({email: email.toLocaleLowerCase().trim()});

    if (isUserPresent) {
      next(new ApiError('User with this email already exists', 409));
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
      next(new ApiError('Not valid id', 400));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

const existId = async (req, res, next) => {
  try {
    const {userId} = req.params;
    const userById = await User.findById(userId);

    if (!userById) {
      next(new ApiError('User is not found', 404));
      return;
    }

    req.user = userById;

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  newUserValidator,
  duplicateEmail,
  validId,
  existId
};
