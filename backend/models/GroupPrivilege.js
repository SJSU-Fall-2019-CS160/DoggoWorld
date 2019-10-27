const {Group} = require('./Group');
const {User} = require('./User');
const Sequelize = require('sequelize');
const db = require('../modules/database');

const GroupPrivilege = db.define('group_privilege', {

    owns: {
        type: Sequelize.BOOLEAN, 
        defaultValue: false
    },
    manages: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

// require unique identification for search
//GroupPrivilege.removeAttribute('id');

module.exports.GroupPrivilege = GroupPrivilege;