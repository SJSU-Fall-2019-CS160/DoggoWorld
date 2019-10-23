const Sequelize = require('sequelize');
const {User} = require('./User');
const db = require('../modules/database');
const Joi = require('@hapi/joi');

const Profile = db.define('profile', {

    img_path: {
        type: Sequelize.STRING
    },
    bio : {
        type: Sequelize.STRING(511)
    }
});

Profile.removeAttribute('id');

function validateProfile(profile) {
    const schema = Joi.object({
        img_path: Joi.string().max(255),
        bio: Joi.string().max(511)
    });
    return schema.validate(profile);
}

exports.Profile = Profile;
exports.validateProfile = validateProfile;