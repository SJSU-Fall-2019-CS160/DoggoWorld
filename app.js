const express = require("express");
const app = express();
//const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const sampleRouter = require("./route/sampleUpdateRoute")
const path = require("path");

//require the http module
const http = require("http").Server(app);

// require the socket.io module
const io = require("socket.io");

const port = 3000;

//bodyparser middleware
app.use(bodyParser.json());

//routes
app.use("/sample", sampleRouter);

//database handling
const dbHandler = require('./src/databaseHandler');
app.get('/data',(req, res)=> dbHandler.query(req,res));

//set the express.static middleware
app.get('/', (req, res) =>{

    res.sendFile(path.join(__dirname,'/public/index.html'));
});

//profile
app.get('/profile', (req, res) =>{

    res.sendFile(path.join(__dirname,'/public/profile.html'));
});


//integrating socketio
socket = io(http);

// start listening on port
app.listen(port, () => console.log(`DoggoWorld listening on port ${port}`)); //http listen?
