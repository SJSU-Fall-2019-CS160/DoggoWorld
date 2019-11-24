const bodyParser = require("body-parser");
const groups = require("../routes/groups");
const users = require("../routes/users");
const events = require("../routes/events");
const login = require("../routes/login");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use("/api/login", login);
  app.use("/api/users", users);
  app.use("/api/groups", groups);
  app.use("/api/events", events);
  app.use(error); // keep this last
};
