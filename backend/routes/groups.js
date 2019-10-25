
const db = require('../modules/database');
const {Group, validateGroup} = require('../models/Group');
const {GroupPrivilege} = require('../models/GroupPrivilege');
const {Event} = require('../models/Event');
const {User, validateUser} = require('../models/User');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const tokenGen = require('../modules/authtoken');


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
    res.send({groups: groups});
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
    const groups = await user.getGroups({
        include:[Group]
    });
    const resArray = groups.map(grp => {
        const obj = {
            owns: grp.owns,
            manages: grp.manages,
            id: grp.mygroup_id,
            name: grp.mygroup.name
        };
        return obj;
    })
    res.send({groups: resArray});
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
    const {error} = validateGroup(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let transaction;
    try {
        transaction = await db.transaction();
        const user = await User.findByPk(req.user.id); // need available before transaction
        const privs = await GroupPrivilege.create({
            owns: true, 
            manages: true,
            user_id: user.id,
            mygroup: { name: req.body.name }
        }, {
            include: [Group],
            transaction
        });
        console.log('arrived');
        await transaction.commit();
        res.send(privs);
    } catch (err) {
        console.log(err);
        if (transaction) await transaction.rollback();
        return res.status(500).send('Could not create Group');
    }
});

// join a group
router.post('/:id', auth, async (req, res) => {

});

// get a group info
router.get('/:id', auth, async (req, res) => {

});

/--ADMIN ACESSES BELOW--/
// Edit group info
router.post('/:id/edit', auth, async (req, res) => {

});

// Create event for group
router.post('/:id/event', auth, async (req, res) => {

});

// Create admin for group
router.post('/:id/makeadmin/:userid', auth, async (req, res) => {

});
module.exports = router;