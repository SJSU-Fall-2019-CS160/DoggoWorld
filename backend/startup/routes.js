const bodyParser = require("body-parser");
const groups = require('../routes/groups');
const users = require('../routes/users');
const login = require('../routes/login');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use('/api/login', login)    
    app.use('/api/users', users);
    app.use('/api/groups', groups);
    app.use(error);   // keep this last
}