const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20,
    unique: true
  }
});
module.exports = mongoose.model('User', user);
