module.exports = (sequelize, DataTypes) => {
    
    const Student  = sequelize.define('students', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        account: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },


        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        address: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:'',
        },

        numberPhone: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },     
    });
    
    return Student;
}


