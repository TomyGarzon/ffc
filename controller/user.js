const User = require('../models/user');

const addUser = (username, callback) => {
  callback({
    usernameC: username
  });
}

module.exports = { addUser };
