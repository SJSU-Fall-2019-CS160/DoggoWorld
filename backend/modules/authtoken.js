const config = require('config');
const jwt = require('jsonwebtoken');
const {User} = require('../models/User');
const {Chat} = require('../models/Chat');
const {GroupPrivilege} = require('../models/GroupPrivilege');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
generateAuthToken = async function(user) {
    const payload = {id: user.id, first_name: user.first_name, last_name: user.last_name };
    let chats = await Chat.findAll({
        attributes: ['id'],
        where: {
            [Op.or]: [{user1_id: user.id},{user2_id:user.id}]
        }
    });
    chats = chats.map(chat => chat.id);
    let groups = await user.getGroups();
    groups = groups.map(group => group.id);
    payload.chats = chats;
    payload.groups = groups;
    const token = jwt.sign(payload, config.get('jwtPrivateKey'));
    return token;
}

module.exports.generateAuthToken = generateAuthToken;