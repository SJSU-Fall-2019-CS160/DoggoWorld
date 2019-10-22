const Sequelize = require('sequelize');
const {User} = require('./User');
const {Chat} = require('./Chat');
const db = require('../modules/database');

const Chatlog = db.define('chatlog', {
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    chat_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Chat,
            key: 'id'
        }
    },
    message: {
        type: Sequelize.STRING(511), 
        allowNull: false
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

Chatlog.removeAttribute('id');

exports = Chatlog;