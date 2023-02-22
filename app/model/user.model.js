module.exports = (sequelize, DataTypes) => {
    
    const User  = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:'',
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        code: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:'',
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

        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        class: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:'',
        },

        courses: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:'',
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },

        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        }

    }, {
        timestamps: false,
    });
    
    return User;
}


