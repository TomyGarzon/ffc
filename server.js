const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.static(__dirname + "/assets/"));
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.get('/', async (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post('/api/exercise/new-user', (req, res) => {
  if (req.body.username) {
    const username = req.body.username;
    if (username.length < 5 || username.length > 20) {
      res.json({ error: "Username must be 5 to 20 characters long." });
    }
    else if (!(/^\w{5,20}$/.test(username))) {
      res.json({ error: "Username can only contain alphanumeric characters and underscore." });
    }
    const {addUser} = require('./controller/user');
    addUser(username, (result) => {
      res.json(result);
    });
  }
  else {
    res.json({ error: "Username is required." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
