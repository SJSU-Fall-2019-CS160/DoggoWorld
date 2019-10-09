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
/*
    pool.query("SELECT * FROM test", (err, rows, fields) =>{// (id, name)
        if (err) {
            res.json({'code' : 100, 'status' : "Error connecting to Database"});
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
*/
    pool.query("Select name from test where id = 1",(err,names,fields) => {
        if (err) {
            res.json({'code' : 100, 'status' : "Error connecting to Database"});
            return;
        }
        console.log("database accessed");
        let str ="";
        for ( ele of names) {
            str += "<tr>";
            str += `<td>${ele.name}</td><td></td>`;
            str += "</tr>";
        }
    res.send(str);
    });

}

function getProfile(id) {
    // return json
}

module.exports = {pool: pool, query : handle_database, getProfile: getProfile};