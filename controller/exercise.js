const User = require('../models/user');
const Exercise = require('../models/exercise');

const addExercise = (userId, description, duration, date, callback) => {
  User.findById(userId, (err, user) => {
    if (err) callback({ error: err });
    if (user) {
      const newExercise = new Exercise({
        userId: userId,
        username: user.username,
        description: description,
        duration: duration,
        date: new Date(date)
      });
      newExercise.save((err, exercise) => {
        if (err) callback({ error: err });
        callback({
          _id: user._id,
          username: exercise.username,
          description: exercise.description,
          duration: exercise.duration,
          date: exercise.date
        });
      });
    }
    else {
      callback({ error: "Unknown user id." });
    }
  });
}

module.exports = { addExercise };
