require("express-async-errors");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
module.exports.io = io;  // Eager export
const socketHandler = require("./modules/socketHandler");


require("./startup/db")();
require("./startup/routes")(app);

const PORT = 5000;
http.listen(PORT, () => console.log(`DoggoWorld listening on port ${PORT}`));

io.on("connection", socketHandler);


