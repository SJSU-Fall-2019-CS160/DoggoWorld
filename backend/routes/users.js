const bcrypt = require('bcrypt');
const _ = require('lodash');
const db = require('../modules/database');
const {User, validate} = require('../models/User');
const {Profile, validateProfile} = require('../models/Profile');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const tokenGen = require('../modules/authtoken');


/**
 * Get user's own profile
 * GET request.
 * Provide JWT token
 * Response
 * {
 *      "img_path" : [STRING],
 *      "bio" : [STRING]
 * }
 * */ 
router.get('/me', auth, async (req, res) => {
    const profile = await Profile.findOne({ 
        where: { user_id: req.user.id}
    });
    res.send(profile);
});

/**
 * Update user's own profile
 * POST request.
 * Provide JWT token
 * req.body (optional fields)= 
 * {
 *      "img_path" : [STRING],
 *      "bio" : [STRING]
 * }
 * */
router.post('/me', auth, async (req, res) => {
    const {error} = validateProfile(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const profile = await Profile.findOne({ 
        where: { user_id: req.user.id}
    });
    if (req.body.img_path) {
        profile.img_path = req.body.img_path;
    }
    if (req.body.bio) {
        profile.bio = req.body.bio;
    }
    await profile.save();
    res.status(200).send("Updated profile");
});

/**
 * Get another user's profile
 */
router.get('/:id', async (req, res) => {
    const profile = await Profile.findOne({ 
        where: { user_id: req.params.id}
    });
    if (!profile) {
        return res.status(404).send("user not found");
    }
    res.send(profile);
});

/**
 * Register a User:
 * POST Request.
 *  req.body=
 *  {    
 *      "first_name": [STRING],
 *      "last_name": [STRING],
 *      "email": [STRING],
 *      "password": [STRING]
 *  }
 * Response.
 * JsonWebToken in header as x-auth-token
 * res.body = 
 * {    
 *      "id": [NUMBER], 
 *      "firstname": [STRING], 
 *      "lastname": [STRING], 
 *      "chats":[ARRAY<NUMBER>]
 * }
 */
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({where: {email: req.body.email}});
    if (user) {
        return res.status(400).send('User already registered');
    }
    user = User.build(_.pick(req.body, ['first_name','last_name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    let transaction;
    try {
        transaction = await db.transaction();
        await user.save({transaction});
        await Profile.create({user_id: user.id}, {transaction});
        await transaction.commit();
    } catch (err) {
        console.log(err.message);
        if (transaction) await transaction.rollback();
    }

    const token = await tokenGen.generateAuthToken(user);
    res.header('x-auth-token', token).send(_.pick(user, ['id','first_name','last_name', 'email']));
});

module.exports = router;