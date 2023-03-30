module.exports = (sequelize, DataTypes) => {
      
    const Council  = sequelize.define('councils', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        timeStart: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        
        timeEnd: {
            type: DataTypes.TIME,
            allowNull: false
        },

        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        }

    }, {
        timestamps: false,
    });

    return Council;
}