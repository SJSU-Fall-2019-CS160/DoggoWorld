const Sequelize = require('sequelize');
const db = require('../config/database');
const Joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));

const Event = db.define('event', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3,50]
        }
    },
    description: {
        type: Sequelize.STRING,
        validate: {
            len:[0, 255]
        }
    },
    date: {
        type: Sequelize.DATEONLY
    },
    time: {
        type: Sequelize.TIME
    }
});


function validateEvent(event) {
    const schema = {
       name:  Joi.string().min(3).max(50).required(),
       description: Joi.string().min(0).max(255).optional(),
       date: Joi.date().format('YYYY-MM-DD'),
       time: Joi.string().regex(/^((2[0-4])|([0-1][0-9]))\:([0-5][0-9])\:([0-5][0-9])$/) // HH:MM:SS
    }
    return Joi.validate(event, schema);

}
exports.Event = Event;
exports.validate = validateEvent;