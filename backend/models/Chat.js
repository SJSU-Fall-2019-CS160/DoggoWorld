const db = require('../config/database');
const {User} = require('./User');
const {Group} = require('./Group');
const Sequelize = require('sequelize');

const Chat = db.define('chat', {
    user1_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    user2_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    group_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Group,
            key: 'id'
        }
    }
});


exports.Chat = Chat;
