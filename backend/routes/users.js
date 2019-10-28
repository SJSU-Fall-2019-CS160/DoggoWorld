const bcrypt = require('bcrypt');
const _ = require('lodash');
const db = require('../modules/database');
const {User, validateUser} = require('../models/User');
const {Profile, validateProfile} = require('../models/Profile');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const tokenGen = require('../modules/authtoken');

/**
 * Get user's own information
 * GET request.
 * Provide JWT token
 * Response
 * {
 *      "id": [number],
 *      "first_name": [string],
 *      "last_name": [string],
 *      "email": [string],
 *      "profile": {
 *          "img_path": [string],
 *          "bio": [string],
 *          "userId": [number]
 *      }
 * }
 * */ 
router.get('/me', auth, async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: {exclude: ['password']},
        include: [Profile]
    });
    res.send(user);
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
 * Get another user's information
 * GET request.
 * Response
 * {
 *      "id": [number],
 *      "first_name": [string],
 *      "last_name": [string],
 *      "email": [string],
 *      "profile": {
 *          "img_path": [string],
 *          "bio": [string],
 *          "userId": [number]
 *      }
 * }
 * */ 
router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: {exclude: ['password']},
        include: [Profile]
    });
    if (!user) {
        return res.status(404).send("user not found");
    }
    res.send(user);
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
 *      "lastname": [STRING]
 * }
 */
router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
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
        user = await user.save({transaction});
        await user.createProfile({bio:"test2"}, {transaction});
        await transaction.commit();
    } catch (err) {
        console.log(err.message);
        if (transaction) await transaction.rollback();
        return res.status(500).send('Could not create account');
    }
    const token = await tokenGen.generateAuthToken(user);
    res.header('x-auth-token', token).send(_.pick(user, ['id', 'first_name', 'last_name', 'email']));
});

module.exports = router;