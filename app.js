const express = require("express");
const app = express();
//const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const sampleRouter = require("./route/sampleUpdateRoute")
//require the http module
const http = require("http").Server(app);

// require the socket.io module
const io = require("socket.io");
const socket = io(http);
const port = 3000;

//bodyparser middleware
app.use(bodyParser.json());

//routes
app.use("/sample", sampleRouter);

//database handling
const dbHandler = require('./src/databaseHandler');
app.get('/data',(req, res)=> dbHandler.query(req,res));

//fetch all chat messages
app.get('/chats', (req, res) => dbHandler.sendAllChats(req, res));

//set the express.static middleware
app.use(express.static(__dirname + "/public"));

//integrating socketio
socket.on("connection", (socket)=>{
    console.log("User chat connected");
    
    socket.on("disconnect", () => {
        console.log("Disconnected");
    });
    
    socket.on("chat message", function(msg) {
        console.log("message: " + msg);
        socket.broadcast.emit("received",{message: msg})
        dbHandler.addMessage(msg, "Anonymous");
    });
});




// start listening on port
app.listen(port, () => console.log(`DoggoWorld listening on port ${port}`));
//http listen
http.listen(80);