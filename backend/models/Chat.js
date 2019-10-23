const db = require('../modules/database');
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
    mygroup_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Group,
            key: 'id'
        }
    }
});


exports.Chat = Chat;
