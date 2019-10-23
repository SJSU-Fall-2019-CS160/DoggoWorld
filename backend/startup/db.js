const db = require('../modules/database');
const {User} = require('../models/User');
const {Group} = require('../models/Group');
const {Event} = require('../models/Event');
const {Chat} = require('../models/Chat');
const {Chatlog} = require('../models/Chatlog');
const {GroupPrivilege} = require('../models/GroupPrivilege');
const {Profile} = require('../models/Profile');

User.hasOne(Profile);
Profile.belongsTo(User);
Group.hasMany(Event);
Event.belongsTo(Group);
User.hasMany(GroupPrivilege, {as: 'Groups'});
Group.hasMany(GroupPrivilege, {as: 'Users'});
User.hasMany(Chatlog);
Chat.hasMany(Chatlog);
User.belongsToMany(Event, {through: 'Guestlist'});
Event.belongsToMany(User, {through: 'GuestList'});

module.exports = function() {
    db.authenticate()
    .then(() => console.log('database connected'))
    .catch(err=> console.log('Error:' + err));
    
    db.sync()
        .then(()=> console.log('All models synced to tables'))
        .catch((err) => console.log('Issue syncing models:' + err));
}