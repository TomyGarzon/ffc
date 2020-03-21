const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exercise = new Schema({
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    require: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: date,
    required: true
  }
});
module.exports = mongoose.model('Exercise', exercise);
