const User = require('../models/user');

const addUser = (username, callback) => {
  User.findOne({username: username}, (err, result) => {
    if (err) callback({error: err});
    if (result) callback({error: "Username already taken."})
    else {
      const newUser = new User({
        username: username
      });
      newUser.save((err, user) => {
        if (err) callback({error: err});
        callback({
          username: user.username,
          _id: user._id
        });
      });
    }
  });
}

module.exports = { addUser };
