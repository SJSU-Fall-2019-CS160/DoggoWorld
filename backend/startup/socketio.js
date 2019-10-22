const io = require("socket.io");

module.exports = function(app) {
    const http = require("http").Server(app);
    const socket = io(http);
    http.listen(80);
}