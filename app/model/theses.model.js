module.exports = (sequelize, DataTypes) => {
    const Theses  = sequelize.define('theses', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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

        statusFile: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
