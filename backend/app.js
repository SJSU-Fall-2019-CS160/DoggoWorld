const express = require("express");
const app = express();

require('./startup/db')();
require('./startup/routes')(app);
require('./startup/socketio')(app);

const PORT = 5000;
app.listen(PORT, () => console.log(`DoggoWorld listening on port ${PORT}`));
