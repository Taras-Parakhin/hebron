const {Schema, model} = require('mongoose');

const {actionTypeEnum} = require('../constants');

const ActionToken = new Schema({
  user_id: {type: Schema.Types.ObjectId, trim: true, required: true, ref: 'User'},
  token: {type: String, required: true},
  actionType: {type: String, enum: Object.values(actionTypeEnum), required: true}
}, {timestamps: true});

module.exports = model('Action_Token', ActionToken);
