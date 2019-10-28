const Joi = require('@hapi/joi');
const {User, validateUser} = require('../models/User');
const {GroupPrivilege} = require('../models/GroupPrivilege');
const auth = require('../middleware/auth');
const {Event, validateEvent, validateEventUpdate} = require('../models/Event');
const express = require('express');
const router = express.Router();

/**
 * Get a event's info
 * GET request.
 * Response.
 * {
 *     "id": [number],
 *     "name": [string],
 *     "description": [string],
 *     "date": "YYYY-MM-DD",
 *     "time": "HH:MM:SS",
 *     "mygroup_id": [number]
 * }
 * */
router.get('/:id', async (req, res) => {
    const {error} = validateId(req.params.id);
    if (error) return res.status(400).send('Invalid event ID');
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    res.send(event);
});

/**
 * Get a event's participants
 * GET request.
 * Response.
 * {
 *    "participants": [
 *        {
 *            "id": [number],
 *            "first_name": [string],
 *            "last_name": [string]
 *        },
 *        {...},
 *        {...}
 *    ]
 * }
 * */
router.get('/:id/participants', async (req, res) => {
    const {error} = validateId(req.params.id);
    if (error) return res.status(400).send('Invalid event ID');
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    const users = await event.getUsers();
    const resArr = users.map(user => {
        const obj = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name
        }
        return obj;
    })
    res.send({participants: resArr});
});

/**
 * Join an event
 * POST request.
 * Provide JWT token
 * */
router.post('/:id/join', auth, async (req, res) => {
    const {error} = validateId(req.params.id);
    if (error) return res.status(400).send('Invalid event ID');
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    const userAllowed = await GroupPrivilege.findOne({
        where : {
            user_id: req.user.id,
            mygroup_id: event.mygroup_id
        }
    });
    if (!userAllowed) return res.status(403).send("User not in group to join event");
    await event.addUser(req.user.id); // automatically check if exists or not
    res.send("Joined event"); 
});

/**
 * Leave an event
 * POST request.
 * Provide JWT token
 * */
router.post('/:id/leave', auth, async (req, res) => {
    const {error} = validateId(req.params.id);
    if (error) return res.status(400).send('Invalid event ID');
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    await event.removeUser(req.user.id); // automatically check if exists or not
    res.send("Left event"); 
});

/--ADMIN ACESSES BELOW--/
/**
 * Update an event
 * POST request.
 * Provide JWT token
 * (fields are optional)
 * {
 *      "name":[string],
 *      "description":[string],
 *      "date": "YYYY-MM-DD",
 *      "time": "HH:MM:SS"
 * }
 * Response.
 * {
 *     "id": [number],
 *     "name": [string],
 *     "description": [string],
 *     "date": "YYYY-MM-DD",
 *     "time": "HH:MM:SS",
 *     "mygroup_id": [number]
 * }
 * */
router.post('/:id/edit', auth, async (req, res) => {
    let joiObj = validateId(req.params.id);
    if (joiObj.error) return res.status(400).send('Invalid event ID');
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    const userAllowed = await GroupPrivilege.findOne({
        where : {
            user_id: req.user.id,
            mygroup_id: event.mygroup_id,
            manages: true
        }
    });
    if(!userAllowed) return res.status(403).send("User not authorized to change event");
    joiObj = validateEventUpdate(req.body);
    if(joiObj.error) return res.status(400).send(joiObj.error.details[0].message);
    event.update(req.body);
    res.send(event);
});

/**
 * Delete an event
 * POST request.
 * Provide JWT token
 * */
router.post('/:id/delete', auth, async (req, res) => {
    let joiObj = validateId(req.params.id);
    if (joiObj.error) return res.status(400).send('Invalid event ID');
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    const userAllowed = await GroupPrivilege.findOne({
        where : {
            user_id: req.user.id,
            mygroup_id: event.mygroup_id,
            manages: true
        }
    });
    if(!userAllowed) return res.status(403).send("User not authorized to change event");
    await event.destroy(); // cascade deletes guestlist automatically
    res.send("Event deleted");
});
function validateId(id) {
    const schema = Joi.number().integer().min(1).required();
    return schema.validate(id);
}

module.exports = router;