require('express-async-errors');
const express = require("express");
const app = express();
const http = require('http').createServer(app);

require('./startup/db')();
require('./startup/routes')(app);
require('./startup/socketio')(app);

const PORT = 5000;
http.listen(5000,() => console.log(`DoggoWorld listening on port ${PORT}`));
//const server = app.listen(PORT, );
