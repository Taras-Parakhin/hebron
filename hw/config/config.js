module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/initial_db',

  ACCESS_TOKEN_SECRET: 'TOKEN_SECRET',
  REFRESH_TOKEN_SECRET: 'REFRESH_SECRET'
}
