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
User.hasMany(GroupPrivilege, {as: 'Groups', foreignKey: 'user_id'}); // temp fix to Issue #11225
GroupPrivilege.belongsTo(User);
Group.hasMany(GroupPrivilege, {as: 'Users', foreignKey: 'mygroup_id'});
GroupPrivilege.belongsTo(Group);
User.hasMany(Chatlog);
Chatlog.belongsTo(User);
Chat.hasMany(Chatlog);
Chatlog.belongsTo(Chat);
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