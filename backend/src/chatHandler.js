
module.exports = function(socket,pool) {
    let module = {};
    let testUserID = 1; // modify with login cookie data when ready
    let testChatID = 1;

    //default chat routing
    socket.on("connection", (socket)=>{
        console.log("User chat connected");
        
        socket.on("disconnect", () => {
            console.log("Disconnected");
        });

        // choose different namespace for sockets later
        socket.on("chat message", function(msg) {
            console.log("message: " + msg);
            socket.broadcast.emit("received",{message: msg})
            pool.query("INSERT INTO chatlog (user_id, chat_id, message) VALUES ( ?, ?, ?)",[testUserID, testChatID, msg],(err, result)=> {
                if (err) {
                    console.log("Error inserting to Database");
                    return;
                }
                console.log("stored message");
            });
        });
    });

    // send chat log
    module.sendAllChats = function(req, res) {

        pool.query("SELECT * FROM chatlog WHERE chat_id = ?",[testChatID], (err, rows, fields) => {
            if (err) {
                res.json({'code' : 100, 'status' : "Error selecting from Database"});
                return;
            }
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.json(rows);
        });
    }

    return module;
}




