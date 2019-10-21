const {Event} = require('./Event');
const {Group} = require('./Group');
const Sequelize = require('sequelize');
const db = require('../config/database');

const EventByGroup = db.define('event_by_group', {
    group_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Group,
            key: 'id'
        }
    },
    event_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Event,
            key: 'id'
        }
    }
});

EventByGroup.removeAttribute('id');

exports = EventByGroup;