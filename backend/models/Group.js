const Sequelize = require('sequelize');
const db = require('../config/database');
const Joi = require('@hapi/joi');

const Group = db.define('event_group', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3,50]
        }
    }
});

function validateGroup(group) {
    const schema = {
       name:  Joi.string().min(3).max(50).required()
    }
    return Joi.validate(group, schema);

}
exports.Group = Group;
exports.validate = validateGroup;