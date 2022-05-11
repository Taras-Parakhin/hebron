const bcrypt = require('bcrypt');

const ApiError = require('../error/apiError');

const comparePasswords = async (hashPassword, password) => {
  const isPasswordSame = await bcrypt.compare(password, hashPassword);

  if (!isPasswordSame) {
    throw new ApiError('Wrong password', 400);
  }
}

const hashPassword = password => bcrypt.hash(password, 10);


module.exports = {
  comparePasswords,
  hashPassword
}
