const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sampleRouter = require("./route/sampleUpdateRoute")
const http = require("http").Server(app);
const io = require("socket.io");
const socket = io(http);
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'nodeuser',
    password: 'nodetest',   // configure to old mysql_native_password
    database: 'doggoworld',
    debug: false
});
const chatHander = require("./src/chatHandler")(socket, pool);

/-development data-/
const port = 5000;
/----/

//bodyparser middleware
app.use(bodyParser.json());

//routes
app.use("/sample", sampleRouter);

//fetch all chat messages
app.get('/chats', (req, res) => chatHander.sendAllChats(req, res));

//set the express.static middleware
app.use(express.static(__dirname + "/public"));

// start listening on port
app.listen(port, () => console.log(`DoggoWorld listening on port ${port}`));
//http listen
http.listen(80);