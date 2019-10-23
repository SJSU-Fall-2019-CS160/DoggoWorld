
const {Group, validateGroup} = require('../models/Group');
const {GroupPrivilege} = require('../models/GroupPrivilege');
const {Event} = require('../models/Event');
const {User, validateUser} = require('../models/User');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const tokenGen = require('../modules/authtoken');


// get all groups
router.get('/search', async (req, res) => {
    const groups = await Group.findAll();
    res.send(groups);
});

// get my joined groups
router.get('/my', auth, async (req, res) => {
    const user = await User.findByPk(req.user.id);
    const groups = await user.getGroups();
    res.send(groups);
});

// create a new group
router.post('/', auth, async (req, res) => {

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