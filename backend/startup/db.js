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
Group.hasMany(Event, {foreignKey: 'mygroup_id', onDelete:'CASCADE'});
Event.belongsTo(Group, {foreignKey: 'mygroup_id', onDelete:'CASCADE'});
User.hasMany(GroupPrivilege, {as: 'Groups', foreignKey: 'user_id', onDelete:'CASCADE'}); // temp fix to Issue #11225
GroupPrivilege.belongsTo(User, {foreignKey: 'user_id', onDelete:'CASCADE'});
Group.hasMany(GroupPrivilege, {as: 'Users', foreignKey: 'mygroup_id', onDelete:'CASCADE'});
GroupPrivilege.belongsTo(Group, {foreignKey: 'mygroup_id', onDelete:'CASCADE'});
User.hasMany(Chatlog, {onDelete:'CASCADE'});
Chatlog.belongsTo(User, {onDelete:'CASCADE'});
Chat.hasMany(Chatlog, { onDelete:'CASCADE'});
Chatlog.belongsTo(Chat, {onDelete:'CASCADE'});
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