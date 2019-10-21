const {Event} = require('./Event');
const {User} = require('./User');
const Sequelize = require('sequelize');
const db = require('../config/database');

const Guestlist = db.define('user_attends_event', {
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    event_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Event,
            key: 'id'
        }
    },
});
Guestlist.removeAttribute('id');

exports = Guestlist;