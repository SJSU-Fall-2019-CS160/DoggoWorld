const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({destination: __dirname+'/temp'});
const upload = multer();
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
app.use(express.static(__dirname + "/public"));
//set the express.static middleware
app.get('/', (req, res) =>{

    res.sendFile(path.join(__dirname,'/public/index.html'));
});

//profile
// app.get('/profile', (req, res) =>{

//     res.sendFile(path.join(__dirname,'/public/profile.html'));
// });

app.get('/profile/:user/profilepic', (req, res) => {
    console.log('get image..')
    let mypath = path.join(__dirname, `/resources/profile/users/${req.params.user}/profilepic.jpg`);
    res.sendFile(mypath);
});
app.post('/profile/:user/profilepic', upload.single('newpic'), (req, res) => {
    console.log('uploading image...');
    const fileName = "profilepic.jpg";
    console.log(req);
    // fs.readFile(req.files.image.path, (err, data) => {
    //     const newPath = `${__dirname}/resources/profile/users/${req.params.user}/${fileName}`;
    //     fs.writeFile(newPath, data, error => {
    //         if (error) {
    //             console.log("could not write to path");
    //             res.end();
    //         } else {
    //             res.end(fileName);
    //         }
    //     });
    // });
    res.send({success: true});
});

app.get('/data/:id',(req, res) => {
    // :id -> req.params.id
    if (req.params.id === "1") {
        // database get img get bio
        //let json = {img : getimg(), bio : getbio()}
        // let json = databaseHandler.getProfile(req.params.id);
        res.send("PROFILE STUFF TO AUTO LOAD");
    }
})


//integrating socketio
socket = io(http);

// start listening on port
app.listen(port, () => console.log(`DoggoWorld listening on port ${port}`)); //http listen?
