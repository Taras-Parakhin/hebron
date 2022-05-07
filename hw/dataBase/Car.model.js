const {Schema, model} = require('mongoose');

const carRoleEnum = require('../constants/car.roles.enum');

const Car = new Schema({
  model: {type: String, trim: true, required: true},
  year: {type: Number, required: true},
  color: {type: String, default: 'white'},
  role: {type: String, enum: Object.values(carRoleEnum), default: carRoleEnum.SEDAN}
}, {timestamps: true});

module.exports = model('Car', Car);
