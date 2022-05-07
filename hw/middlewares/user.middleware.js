const User = require('../dataBase/User.model');
const ApiError = require('../error/apiError');

const emptyField = (req, res, next) => {
  try {
    const {name, email} = req.body;

    if (!name || !email) {
      next(new ApiError('All fields must be filled', 400));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

const validEmail = (req, res, next) => {
  try {
    const {email} = req.body;

    if (!email.includes('@')) {
      next(new ApiError('Not valid email', 400));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

const duplicateEmail = async (req, res, next) => {
  try {
    const {email = ''} = req.body;
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
  emptyField,
  validEmail,
  duplicateEmail,
  validId,
  existId
};
