const Sequelize = require('sequelize');
const db = require('../modules/database');
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
    const schema = Joi.object({
       name:  Joi.string().min(3).max(50).required(),
       description: Joi.string().min(0).max(255).optional(),
       date: Joi.date().format('YYYY-MM-DD').optional(),
       time: Joi.string().regex(/^((2[0-4])|([0-1][0-9]))\:([0-5][0-9])\:([0-5][0-9])$/).message("time must be in format HH:MM:SS").optional() // HH:MM:SS
    });
    return schema.validate(event);

}
exports.Event = Event;
exports.validateEvent = validateEvent;