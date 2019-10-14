const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'nodeuser',
    password: 'nodetest',   // configure to old mysql_native_password
    database: 'doggoworld',
    debug: false
});

function handle_database(req, res) {

    pool.query("SELECT * FROM test", (err, rows, fields) =>{// (id, name)
        if (err) {
            res.json({'code' : 100, 'status' : "Error selecting from Database"});
            return;
        }
        console.log("database accessed");
        let str ="<table><tr><th>ID</th><th>NAME</th></tr>";
            for ( ele of rows) {
                str += "<tr>";
                str += `<td>${ele.id}</td><td>${ele.name}</td>`;
                str += "</tr>";
            }
        res.send(str);
    });
}

function addMessage(msg, user_id, chat_id) {
    pool.query("INSERT INTO chatlog (user_id, chat_id, message) VALUES ( ?, ?, ?)",[user_id, chat_id, msg],(err, result)=> {
        if (err) {
            console.log("Error inserting to Database");
            return;
        }
        console.log("stored message");
    })
}

function sendAllChats(req, res, chat_id) {

    pool.query("SELECT * FROM chatlog WHERE chat_id = ?",[chat_id], (err, rows, fields) => {
        if (err) {
            res.json({'code' : 100, 'status' : "Error selecting from Database"});
            return;
        }
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.json(rows);
    });
}

module.exports = {pool: pool, query : handle_database, addMessage: addMessage, sendAllChats: sendAllChats};