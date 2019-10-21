const {Group} = require('./Group');
const {User} = require('./User');
const Sequelize = require('sequelize');
const db = require('../config/database');

const GroupPrivilege = db.define('group_privilege', {
    user_id: {
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
    },
    owns: {
        type: Sequelize.BOOLEAN, 
        defaultValue: false
    },
    manages: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

GroupPrivilege.removeAttribute('id');

exports = GroupPrivilege;