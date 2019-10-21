const db = require('./config/database');
const users = require('./routes/users');

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io");
const socket = io(http);
/-development data-/
const PORT = 5000;
/----/

db.authenticate()
    .then(() => console.log('database connected'))
    .catch(err=> console.log('Error:' + err));

// sync models
require('./config/dbloader')();

//routes
app.use(bodyParser.json());
app.use('api/users', users);

// start listening on port
app.listen(PORT, () => console.log(`DoggoWorld listening on port ${PORT}`));
//http listen
http.listen(80);