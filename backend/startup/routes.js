const bodyParser = require("body-parser");

const users = require('../routes/users');
const login = require('../routes/login');
const error = require('../middleware/error');
module.exports = function(app) {
    app.use(bodyParser.json());
    app.use('/api/login', login)    
    app.use('/api/users', users);
    
    app.use(error);   // keep this last
}