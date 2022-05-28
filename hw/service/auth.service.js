const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../error/apiError');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACTION_TOKEN_SECRET} = require('../config/config');
const {tokenTypeEnum, actionTypeEnum} = require('../constants');

const comparePasswords = async (hashPassword, password) => {
  const isPasswordSame = await bcrypt.compare(password, hashPassword);

  if (!isPasswordSame) {
    throw new ApiError('Wrong password', 400);
  }
};

const hashPassword = password => bcrypt.hash(password, 10);

const generateTokenPair = (encodeDate = {}) => {
  const access_token = jwt.sign(encodeDate, ACCESS_TOKEN_SECRET, {expiresIn: '15d'});
  const refresh_token = jwt.sign(encodeDate, REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

  return {
    access_token,
    refresh_token
  };
};

const generateActionToken = (encodeData = {}) => jwt.sign(encodeData, ACTION_TOKEN_SECRET, {expiresIn: '24h'});

const validateToken = (token, tokenType = tokenTypeEnum.ACCESS) => {
  try {
    let secretWord = ACCESS_TOKEN_SECRET;

    if (tokenType === tokenTypeEnum.REFRESH) {
      secretWord = REFRESH_TOKEN_SECRET;
    }

    if (tokenType === actionTypeEnum.FORGOT_PASSWORD) {
      secretWord = ACTION_TOKEN_SECRET;
    }

    return jwt.verify(token, secretWord);
  } catch (e) {
    throw new ApiError(e.message || 'Invalid token', 401);
  }
};

module.exports = {
  comparePasswords,
  hashPassword,
  generateTokenPair,
  generateActionToken,
  validateToken
};
