const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 10,
        min: 0,
        acquire: process.env.ACQUIRE,
        idle: process.env.IDLE
    }
});

    const db = {};

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    
    db.users = require('../model/user.model')(sequelize, DataTypes);
    db.councils = require('../model/council.model')(sequelize, DataTypes);
    db.departments = require('../model/department.model')(sequelize, DataTypes);
    db.notificationdetails = require('../model/notificationdetail.model')(sequelize, DataTypes);
    db.notification = require('../model/notification.model')(sequelize, DataTypes);
    db.pointi = require('../model/pointi.model')(sequelize, DataTypes);
    db.results = require('../model/result.model')(sequelize, DataTypes);
    db.schoolyears = require('../model/schoolyear.model')(sequelize, DataTypes);
    db.topics = require('../model/topic.model')(sequelize, DataTypes);    
    
    // One-To-One
    db.schoolyears.hasOne(db.topics);
    db.topics.belongsTo(db.schoolyears);
    
    db.topics.hasOne(db.results);
    db.results.belongsTo(db.topics);

    db.users.hasOne(db.pointi);
    db.pointi.belongsTo(db.users);

    db.users.hasOne(db.topics);
    db.topics.belongsTo(db.users);

    // One-To-Many
    db.departments.hasMany(db.users);
    db.users.belongsTo(db.departments);
    
    
    db.councils.hasMany(db.topics);
    db.topics.belongsTo(db.councils);

    // Many-To-Many

    db.users.belongsToMany(db.notification, {through: db.notificationdetails});
    db.notification.belongsToMany(db.users, {through: db.notificationdetails});




    db.sequelize.sync({force: false})
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
module.exports = db;