const Sequelize = require('sequelize');
const db = require('../modules/database');
const Joi = require('@hapi/joi');


const Group = db.define('mygroup', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3,50]
        }
    }
});

function validateGroup(group) {
    const schema = Joi.object({
       name:  Joi.string().min(3).max(50).required()
    });
    return schema.validate(group);

}
function validateGroupId(id) {
    const schema = Joi.number().integer().min(1).required();
    return schema.validate(id);
}
exports.Group = Group;
exports.validateGroup = validateGroup;
exports.validateGroupId = validateGroupId;