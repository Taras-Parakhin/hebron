const express = require('express');
const {engine} = require("express-handlebars");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const {PORT, MONGODB_URL} = require('./config/config');
const userRouter = require('./routes/user.router');
const carRouter = require('./routes/car.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs');
app.set('views', './static');

mongoose.connect(MONGODB_URL).then(() => {
  console.log('Connection success');
});

app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('*', _notFoundHandler);
app.use(_mainErrorHandler);

function _notFoundHandler(req, res, next) {
  next(new Error('Not found'));
}

function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Server error',
      status: err.status
    });
}

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});

// TODO
// KISS
// YAGNI
// TODO OPTIONAL
// SOLID
