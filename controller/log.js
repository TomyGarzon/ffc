const User = require('../models/user');
const Exercise = require('../models/exercise');

const getLog = (userId, from, to, limit, callback) => {
  User.findById(userId, (err, user) => {
    if (err) callback({ error: err });
    if (user) {
      Exercise.find({
        userId: userId,
        date: {
          $lt: to,
          $gt: from
        }
      }).sort({ date: -1 })
        .select({ _id: 0, __v: 0})
        .limit(limit)
        .exec((error, exercises) => {
          if (error) callback({ error: error });
          callback({
            _id: userId,
            username: user.username,
            from: new Date(from).toDateString(),
            to: new Date(to).toDateString(),
            count: exercises.length,
            log: exercises.map(exercise => ({
              description: exercise.description,
              duration: exercise.duration,
              date: exercise.date.toDateString()
            }))
          });
        });
    }
    else {
      callback({ error: "Unknown user id." });
    }
  });
}

module.exports = { getLog };
