const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShortId = require('shortid');
const user = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20,
    unique: true
  },
  _id: {
    type: String,
    default: ShortId.generate
  }
});
module.exports = mongoose.model('User', user);
