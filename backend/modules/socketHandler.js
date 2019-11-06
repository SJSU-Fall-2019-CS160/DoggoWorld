const io = require("../app").io;
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const { Chat } = require("../models/Chat");
const { Chatlog } = require("../models/Chatlog");
const { User } = require("../models/User");
const MESSAGE_SEND = "MESSAGE_SEND";
const MESSAGE_RECIEVE = "MESSAGE_RECIEVE";
const USER_CONNECT = "USER_CONNECT";
let liveChats = [];

module.exports = function(socket) {
    console.log("socket id:" + socket.id);

    // when user connects, get jwt token to verify identity
    // add new chats to the liveChats array if not live
    // callback will return a array of string of chatIds to allow connetion to
    let userInfo;
    socket.on(USER_CONNECT, (token, callback) => {
        console.log("entered user connect");
        userInfo = authenticateUser(token);
        if (!userInfo) return;
        addChats(userInfo.chats);
        console.log(liveChats);
        generateChatlogs(userInfo.chats).then(array => {
            console.log(array);
            callback(array);
        });
        //callback(chatObjArr); // generate socket.on stuff in client, save messages in state
    });

    socket.on(MESSAGE_SEND, (chatid, name, message) => {
        /--ADD STORAGE TO DATABASES-/;
        console.log(chatid, name, message);
        socket.emit(`${MESSAGE_RECIEVE}-${chatid}`, {
            message,
            name,
            created_at: "now"
        });
    });
};

// generate chat objects with all the logs
// id, messages
async function generateChatlogs(chatIds) {
    const chats = await Chat.findAll({
        where: {
            id: chatIds
        }
    });
    console.log("got chats");
    return Promise.all(chats.map(chat => getObjs(chat)));
}

const getObjs = async chat => {
    const logs = await chat.getChatlogs({ include: [User] });
    const messages = logs.map(log => {
        return {
            message: log.message,
            name: log.user.first_name,
            created_at: log.created_at
        };
    });
    return {
        id: chat.id,
        messages
    };
};

function addChats(newChats) {
    liveChats = _.union(newChats, liveChats);
}

function authenticateUser(token) {
    if (!token) return;
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        return decoded;
    } catch (ex) {
        return;
    }
}
