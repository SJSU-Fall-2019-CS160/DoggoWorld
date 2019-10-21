const db = require('./database');

require('../models/User');
require('../models/Chat');
require('../models/Group');
require('../models/Event');
require('../models/EventByGroup');
require('../models/Chatlog');
require('../models/GroupPrivilege');
require('../models/Guestlist');

module.exports = async function() {
    db.sync()
        .then(()=> console.log('All models synced to tables'))
        .catch((err) => console.log('Issue syncing models:' + err));
}