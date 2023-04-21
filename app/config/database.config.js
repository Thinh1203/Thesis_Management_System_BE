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
    timezone: '+00:00',
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
    
    db.teachers = require('../model/teacher.model')(sequelize, DataTypes);
    db.councils = require('../model/council.model')(sequelize, DataTypes);
    db.councilDetails = require('../model/councildetail.model')(sequelize, DataTypes);
    db.gradeIs = require('../model/gradei.model')(sequelize, DataTypes);

    db.roles = require('../model/role.model')(sequelize, DataTypes);
    db.schoolYears = require('../model/schoolyear.model')(sequelize, DataTypes);
    db.theses = require('../model/theses.model')(sequelize, DataTypes);
    db.topics = require('../model/topic.model')(sequelize, DataTypes);    
    db.students = require('../model/student.model')(sequelize, DataTypes);
    db.transcripts = require('../model/transcript.model')(sequelize, DataTypes);
    // ----- One-To-One ----- // 
     
    db.roles.hasOne(db.students);
    db.students.belongsTo(db.roles); 

    db.students.hasOne(db.theses);
    db.theses.belongsTo(db.students);

    db.topics.hasOne(db.theses);
    db.theses.belongsTo(db.topics);  

    // ----- One-To-Many ----- //

    db.roles.hasOne(db.teachers);
    db.teachers.belongsTo(db.roles);

    db.teachers.hasMany(db.theses);
    db.theses.belongsTo(db.teachers);


    db.councils.hasMany(db.theses);
    db.theses.belongsTo(db.councils);   

    db.gradeIs.hasMany(db.students);
    db.students.belongsTo(db.gradeIs);

    db.teachers.hasMany(db.councilDetails);
    db.councilDetails.belongsTo(db.teachers);

    db.councils.hasMany(db.councilDetails);
    db.councilDetails.belongsTo(db.councils);

    db.schoolYears.hasMany(db.councils);
    db.councils.belongsTo(db.schoolYears);

    db.schoolYears.hasMany(db.theses);
    db.theses.belongsTo(db.schoolYears);

    // many-to-many

    db.teachers.belongsToMany(db.theses, { through: 'transcripts'});
    db.theses.belongsToMany(db.teachers, { through: 'transcripts'});


    db.sequelize.sync({alter: true})
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
module.exports = db;