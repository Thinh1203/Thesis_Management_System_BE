const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00',
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    },
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
    
    db.councils = require('../model/council.model')(sequelize, DataTypes);
    db.councilDetails = require('../model/councildetail.model')(sequelize, DataTypes);
    db.departments = require('../model/department.model')(sequelize, DataTypes);
    db.gradeIs = require('../model/gradei.model')(sequelize, DataTypes);
    db.notification = require('../model/notification.model')(sequelize, DataTypes);
    db.notificationDetails = require('../model/notificationdetail.model')(sequelize, DataTypes);
    db.roles = require('../model/role.model')(sequelize, DataTypes);
    db.schoolYears = require('../model/schoolyear.model')(sequelize, DataTypes);
    db.theses = require('../model/theses.model')(sequelize, DataTypes);
    db.topics = require('../model/topic.model')(sequelize, DataTypes);    
    db.users = require('../model/user.model')(sequelize, DataTypes);
    
    // ----- One-To-One ----- // 
     
    db.roles.hasOne(db.users);
    db.users.belongsTo(db.roles); 

    db.topics.hasOne(db.theses);
    db.theses.belongsTo(db.topics);  

    // ----- One-To-Many ----- //

    db.departments.hasMany(db.theses);
    db.theses.belongsTo(db.departments);

    db.departments.hasMany(db.topics);
    db.topics.belongsTo(db.departments);

    db.departments.hasMany(db.users);
    db.users.belongsTo(db.departments);

    db.gradeIs.hasMany(db.users);
    db.users.belongsTo(db.gradeIs);


    db.users.hasMany(db.notificationDetails);
    db.notificationDetails.belongsTo(db.users);

    db.notification.hasMany(db.notificationDetails);
    db.notificationDetails.belongsTo(db.notification);

    db.users.hasMany(db.councilDetails);
    db.councilDetails.belongsTo(db.users);

    db.councils.hasMany(db.councilDetails);
    db.councilDetails.belongsTo(db.councils);

    db.schoolYears.hasMany(db.councils);
    db.councils.belongsTo(db.schoolYears);

    db.schoolYears.hasMany(db.theses);
    db.theses.belongsTo(db.schoolYears);

    db.sequelize.sync({force: false})
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
module.exports = db;