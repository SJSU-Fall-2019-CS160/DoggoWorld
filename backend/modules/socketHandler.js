const io = require("../app").io;
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const { Chat } = require("../models/Chat");
const { Chatlog } = require("../models/Chatlog");
const { GroupPrivilege } = require('../models/GroupPrivilege');
const { Group } = require('../models/Group');
const { User } = require("../models/User");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const MESSAGE_SEND = "MESSAGE_SEND";
const MESSAGE_RECIEVE = "MESSAGE_RECIEVE";
const MESSAGE_ERROR = "MESSAGE_ERROR";
const ADD_CHAT = "ADD_CHAT";
const USER_CONNECT = "USER_CONNECT";

const connectedUsers = {};

module.exports = function (socket) {

    console.log(`Connect | Socket: [${socket.id}]`);

    let userInfo; // stores decoded JWT Token info

    /**
     * User connects: Get jwt token to verify identity.
     * Return an array of chat objects with data included.
     */
    socket.on(USER_CONNECT, (token, callback) => {
        console.log("Entered user connect");
        userInfo = authenticateUser(token);
        if (!userInfo) return;
        console.log(`Verified User | Socket: [${socket.id}] ID: [${userInfo.id}] Name: [${userInfo.first_name} ${userInfo.last_name}]`);
        connectedUsers[userInfo.id] = socket.id;
        getChats(userInfo).then(array => {
            console.log("Sending chatlogs to user");
            callback(array);
        });
    });

    /**
     * User sends message: Log the message in the database.
     * Reformat the message so only those listening on those chats can catch.
     * Emit the message to all users.
     */
    socket.on(MESSAGE_SEND, (chatid, message) => {
        console.log("MESSAGE_SEND entered");
        if (!userInfo) {
            socket.emit(MESSAGE_ERROR, "User not verified");
            return;
        }
        Promise.all([User.findByPk(userInfo.id), Chat.findByPk(chatid)]).then(([user, chat]) => {
            console.log("message value: ", message);
            const log = Chatlog.build({ message });
            log.setUser(user, { save: false });
            log.setChat(chat, { save: false });
            log.save();
        });
        socket.broadcast.emit(`${MESSAGE_RECIEVE}-${chatid}`, {
            message,
            name: userInfo.first_name,
            created_at: "now"
        });
        socket.emit(`${MESSAGE_RECIEVE}-${chatid}`, {
            message,
            name: "Me",
            created_at: "now"
        });
    });

    /**
     * User disconnects: Log onto console.
     */
    socket.on('disconnect', () => {
        let usrstr = '';
        if (userInfo) {
            delete connectedUsers[userInfo.id];
            usrstr = `ID: [${userInfo.id}] Name: [${userInfo.first_name} ${userInfo.last_name}]`;
        }
        console.log(`Disconnect | Socket: [${socket.id}] ${usrstr}`);
    })
};

/**
 * Gets an array of chat data objects.
 */
async function getChats(userInfo) {
    console.log("Generating Chatlogs");
    const groups = await GroupPrivilege.findAll({
        where: { user_id: userInfo.id },
        logging: false
    });
    const groupIds = groups.map(grouppriv => grouppriv.mygroup_id);
    let chats = await Chat.findAll({
        where: {
            [Op.or]: [
                { mygroup_id: groupIds },
                { [Op.or]: [{ user1_id: userInfo.id }, { user2_id: userInfo.id }] }
            ]
        },
        logging: false
    });
    console.log("Creating Chat Objects");
    return Promise.all(chats.map(chat => generateChatlog(chat, userInfo.id)));
}

/**
 * Generates chatlogs for one chat
 */
const generateChatlog = async (chat, id) => {
    const logs = await chat.getChatlogs({
        include: [User],
        order: [["created_at"]],
        logging: false
    });
    const messages = logs.map(log => {
        return {
            message: log.message,
            name: log.user.id === id ? "Me" : log.user.first_name,
            created_at: log.created_at
        };
    });
    let name;
    if (chat.mygroup_id) {
        name = await Group.findByPk(chat.mygroup_id, { logging: false });
        name = name.name;
    } else {
        const otherId = chat.user1_id === id ? chat.user2_id : chat.user1_id;
        name = await User.findByPk(otherId, { logging: false });
        name = name.first_name;
    }
    return {
        id: chat.id,
        name,
        messages
    };
};



/**
 * Authenticates User in websocket connection. Uses JWT token.
 */
function authenticateUser(token) {
    if (!token) return;
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        return decoded;
    } catch (ex) {
        return;
    }
}


/**
 * Alerts online users if a new chat is added.
 */
function alertNewChat(userid, chatid, chatname) {
    console.log(userid, chatid, chatname);
    if (connectedUsers[userid]) {
        io.to(connectedUsers[userid]).emit(ADD_CHAT, {
            id: chatid,
            name: chatname,
            messages: []
        });
    }
}

module.exports.alertNewChat = alertNewChat;