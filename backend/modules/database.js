const Sequelize = require('sequelize');

const database = new Sequelize('doggoworld', 'nodeuser', 'nodetest', {
    host: 'localhost',
    dialect:'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false,
        freezeTableName: true
    }
});


module.exports = database;