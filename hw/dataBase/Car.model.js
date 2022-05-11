const {Schema, model} = require('mongoose');

const {carRolesEnum} = require('../constants');

const Car = new Schema({
  model: {type: String, trim: true, required: true},
  year: {type: Number, required: true},
  color: {type: String, default: 'white'},
  role: {type: String, enum: Object.values(carRolesEnum), default: carRolesEnum.SEDAN}
}, {timestamps: true});

module.exports = model('Car', Car);
