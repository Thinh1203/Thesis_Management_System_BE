module.exports = (sequelize, DataTypes) => {
    const Theses  = sequelize.define('theses', {
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

        startDate: {
            type: DataTypes.DATE,
            allowNull: false,

        },

        endDate: {
            type: DataTypes.DATE,
            allowNull: false,

        },

        reportFile: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        student: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lecturer: {
            type: DataTypes.STRING,
            allowNull: false
        },

        score: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        }
        
    }, {
        timestamps: false,
    });

    return Theses;
}
