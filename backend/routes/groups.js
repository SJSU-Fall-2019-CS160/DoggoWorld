
const db = require('../modules/database');
const {Group, validateGroup, validateGroupId} = require('../models/Group');
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
    const {error} = validateGroupId(req.params.id);
    if (error) {
        return res.status(404).send("group invalid");
    }
    const group = await Group.findByPk(req.params.id);
    if (!group) {
        return res.status(404).send("group not found");
    }
    const [model, created] = await GroupPrivilege.findOrCreate({
        where: {
            user_id: req.user.id,
            mygroup_id: req.params.id
        }
    });
    res.send({newjoined: created});
});

/**
 * Get a group's info
 * GET request.
 * Response
 * {
 *   "id": [number],
 *   "name": [string],
 *   "Users": [
 *       {
 *           "owns": [boolean],
 *           "manages": [boolean],
 *           "user": {
 *               "id": [number],
 *               "first_name": [string],
 *               "last_name": [string]
 *           }
 *       },
 *       {...},
 *       {...}
 *   ],
 *   "Events": [
 *      {
 *           "id":[number],
 *           "name":[string],
 *           "description":[string],
 *           "date":[mysqldate],
 *           "time":[mysqltime]
 *      }
 *   ]
 * }
 * */
router.get('/:id', async (req, res) => {
    const {error} = validateGroupId(req.params.id);
    if (error) {
        return res.status(404).send("group invalid");
    }
    const group = await Group.findByPk(req.params.id, {
        include:[
            {
                model: GroupPrivilege, 
                as:'Users', 
                attributes:['owns','manages'],
                include:[
                    {
                        model: User,
                        attributes:['id','first_name','last_name']
                    }
                ]
            },
            {
                model: Event, 
                as: 'Events',
                attributes:['id', 'name', 'description', 'date', 'time']
            }
        ]
    });
    if (!group) {
        return res.status(404).send("group not found");
    }
    res.send(group);
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
    const {error : err1} = validateGroupId(req.params.id);
    if (err1) {
        return res.status(404).send("group invalid");
    }

    const {error: err2} = validateGroup(req.body);
    if (err2) {
        return res.status(400).send(err2.details[0].message);
    }
    const admin = await GroupPrivilege.findOne({
        where: {
            user_id: req.user.id,
            mygroup_id: req.params.id,
            manages: true
        }
    });
    if (!admin) {
        return res.status(403).send("User does not have editing privileges");
    }
    const group = await admin.getMygroup();
    group.update({name: req.body.name});
    res.send("Group name updated");
});

// Create event for group
router.post('/:id/event', auth, async (req, res) => {

});

// Create admin for group
router.post('/:id/makeadmin/:userid', auth, async (req, res) => {

});
module.exports = router;