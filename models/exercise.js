const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exercise = new Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User',
    index: true
  },
  username: String,
  description: {
    type: String,
    require: true,
    maxlength: [20, 'description too long']
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'duration too short']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});
module.exports = mongoose.model('Exercise', exercise);
