var LocalStrategy =require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-node.js');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE' + dbconfig.database);

module.exports = function(passport) {
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        connection.query("SELECT * FROM users WHERE id = ?", [id],
            function(err, rows){
                done(err, rows[0]);
            });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'name',
            passwordField : 'password',
            passReqToCallback: true
        },
            function (req, name, password, done) {
             connection.query("SELECT * FROM users WHERE name = ?"),
             [name], function (err, rows) {
                 if(err)
                     return done(err);
                 if(rows.length){
                     return done(null, false, req.flash('signupMessage', 'That is already taken'));
                 } else {
                     var newUserMysql = {
                         name: name,
                         password: bcrypt.hashSync(password, null, null)
                     };

                     var insertQuery = "INSERT INTO users (name, password) values (?, ?)";
                     connection.query(insertQuery, [newUserMysql.name, newUserMysql.password],
                         function (err, rows) {
                             newUserMysql.id = rows.insertId;
                             return done(null, newUserMysql);
                         });
             }
            })

    )
}