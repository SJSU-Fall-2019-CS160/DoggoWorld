const Joi = require('@hapi/joi');
const _ = require('lodash');
const { toIso8601, toMysql } = require('../modules/datetime');
const db = require('../modules/database');
const { Group, validateGroup } = require('../models/Group');
const { GroupPrivilege } = require('../models/GroupPrivilege');
const { Event, validateEvent } = require('../models/Event');
const { User, validateUser } = require('../models/User');
const { Chat } = require('../models/Chat');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const tokenGen = require('../modules/authtoken');
const { alertNewChat } = require('../modules/socketHandler');


/**
 * Get all groups
 * GET request.
 * Response
 * {
 *    "groups": [
 *       {
 *           "id": [number],
 *           "name": [string]
 *       },
 *       {...},
 *       {...}
 *   ]
 * }
 * */
router.get('/search', async (req, res) => {
    const groups = await Group.findAll();
    res.send({ groups: groups });
});

/**
 * Get my joined groups
 * GET request.
 * Provide JWT token
 * Response
 * {
 *    "groups": [
 *        {
 *            "owns": [boolean],
 *            "manages": [boolean],
 *            "id": [number],
 *            "name": [string]
 *        },
 *        {...},
 *        {...}
 *    ]
 * }
 * */
router.get('/my', auth, async (req, res) => {
    const user = await User.findByPk(req.user.id);
    const groups = await user.getGroups({ include: [Group] });
    const resArray = groups.map(grp => {
        const obj = {
            owns: grp.owns,
            manages: grp.manages,
            id: grp.mygroup_id,
            name: grp.mygroup.name
        };
        return obj;
    })
    res.send({ groups: resArray });
});

/**
 * Create new group
 * POST request.
 * Provide JWT token
 * req.body (optional fields)= 
 * {
 *      "name" : [STRING],
 * }
 * Response.
 * {
 *      "id":[NUMBER]',
 *      "name":[STRING]
 * }
 * */
router.post('/', auth, async (req, res) => {

    const { error } = validateGroup(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let transaction;
    try {
        transaction = await db.transaction();
        const user = await User.findByPk(req.user.id); // need available before transaction
        const group = await Group.create({ name: req.body.name }, { transaction });
        const chat = await group.createChat({}, { transaction });
        const privs = GroupPrivilege.build({
            owns: true,
            manages: true,
            user_id: user.id,
            mygroup_id: group.id
        });
        await privs.save({ transaction });
        await transaction.commit();
        console.log('Created group');
        alertNewChat(req.user.id, chat.id, group.name);
        res.send(group);
    } catch (err) {
        console.log(err);
        if (transaction) await transaction.rollback();
        return res.status(500).send('Could not create Group');
    }
});

/**
 * Join group
 * POST request.
 * Provide JWT token
 * Response.
 * {
 *      "newjoined": [boolean]
 * }
 * */
router.post('/:id/join', auth, async (req, res) => {
    const { error } = validateId(req.params.id);
    if (error) return res.status(400).send("group invalid");
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).send("group not found");
    const [model, created] = await GroupPrivilege.findOrCreate({
        where: {
            user_id: req.user.id,
            mygroup_id: req.params.id
        }
    });
    const chat = await group.getChat();
    if (created) {
        alertNewChat(req.user.id, chat.id, group.name);
    }
    res.send({ newjoined: created });
});

/**
 * Get a group's info
 * GET request.
 * Response
 * {
 *   "id": [number],
 *   "name": [string]
 * }
 * */
router.get('/:id', async (req, res) => {
    const { error } = validateId(req.params.id);
    if (error) return res.status(400).send("group invalid");
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).send("group not found");
    res.send(group);
});

/**
 * Get a group's member users
 * GET request.
 * Response
 * {
 *   "members": [
 *       {
 *           "id": [number],
 *           "first_name": [string],
 *           "last_name": [string],
 *           "owns": [boolean],
 *           "manages": [boolean]
 *       },
 *       {...},
 *       {...}
 *   ]
 * }
 * */
router.get('/:id/members', async (req, res) => {
    const { error } = validateId(req.params.id);
    if (error) return res.status(400).send("group invalid");
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).send("group not found");
    const members = await group.getUsers({ include: [User] });
    //refactor the following to be async
    const resArr = members.map(user => {
        const obj = {
            id: user.user.id,
            first_name: user.user.first_name,
            last_name: user.user.last_name,
            owns: user.owns,
            manages: user.manages
        };
        return obj;
    });
    res.send({ members: resArr });
});

/**
 * Get a group's events
 * GET request.
 * Response
 * {
 *      "events": [
 *             {
 *                 "id": [number],
 *                 "name": [string],
 *                 "description": [string],
 *                 "date": "YYYY-MM-DD",
 *                 "time": "HH:MM:SS"
 *             },
 *             {...},
 *             {...}
 *       ]
 * }
 * */
router.get('/:id/events', async (req, res) => {
    const { error } = validateId(req.params.id);
    if (error) return res.status(400).send("group invalid");
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).send("group not found");
    const events = await group.getEvents({ attributes: { exclude: ['mygroup_id'] } });
    res.send({ events });
});

/--ADMIN ACESSES BELOW--/
/**
 * Edit group info
 * POST request.
 * Provide JWT token
 * {
 *      "name":[string]
 * }
 * */
router.post('/:id/edit', auth, async (req, res) => {
    let joiObj = validateId(req.params.id);
    if (joiObj.error) return res.status(400).send("group invalid");
    joiObj = validateGroup(req.body);
    if (joiObj.error) return res.status(400).send(joiObj.error.details[0].message);
    const isAdmin = await assertAdmin(req.user.id, req.params.id, res);
    if (!isAdmin) return;
    const group = await Group.findByPk(req.params.id);
    group.update({ name: req.body.name });
    res.send("Group name updated");
});

/**
 * Set admin for group
 * POST request.
 * Provide JWT token
 * */
router.post('/:id/makeadmin/:userid', auth, async (req, res) => {
    let joiObj = validateId(req.params.id);
    if (joiObj.error) return res.status(400).send("group invalid");
    joiObj = validateId(req.params.userid);
    if (joiObj.error) return res.status(400).send("user invalid");
    const isAdmin = await assertAdmin(req.user.id, req.params.id, res);
    if (!isAdmin) return;
    const target = await GroupPrivilege.findOne({
        where: {
            user_id: req.params.userid,
            mygroup_id: req.params.id
        }
    });
    if (!target) return res.status(404).send("User not in group");
    if (!target.manages) target.update({ manages: true });
    res.send(`Set user:${target.user_id} to admin for group:${target.mygroup_id}`);
});

// MYSQL DATE: yyyy-mm-dd
// MYSQL TIME: HH:MM:SS
/**
 * Create event for group
 * POST request.
 * Provide JWT token
 * {
 *      "name":[string],
 *      "description":[string],
 *      "date": "YYYY-MM-DD",
 *      "time": "HH:MM:SS"
 * }
 * Response
 * {
 *   "id": [number],
 *   "name": [string]
 * }
 * */
router.post('/:id/event', auth, async (req, res) => {
    let joiObj = validateId(req.params.id);
    if (joiObj.error) return res.status(400).send("group invalid");
    joiObj = validateEvent(req.body);
    if (joiObj.error) return res.status(400).send(joiObj.error.details[0].message);
    const isAdmin = await assertAdmin(req.user.id, req.params.id, res);
    if (!isAdmin) return;
    const group = await Group.findByPk(req.params.id);
    if (!group) return res.status(404).send("Group not found");
    const event = await group.createEvent(req.body);
    res.send({id:event.id, name: event.name});
});

/--TODO: event editing--, maybe in new router/

function validateId(id) {
    const schema = Joi.number().integer().min(1).required();
    return schema.validate(id);
}

async function assertAdmin(user_id, mygroup_id, res) {
    const admin = await GroupPrivilege.findOne({
        where: {
            user_id,
            mygroup_id,
            manages: true
        }
    });
    if (!admin) {
        res.status(403).send("User does not have privileges complete action");
        return false;
    }
    return true;
}
module.exports = router;