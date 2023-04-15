module.exports = (sequelize, DataTypes) => {

    const SchoolYear  = sequelize.define('shoolYears', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        
        year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNul: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        }
        
    }, {
        timestamps: false,
    });

    return SchoolYear;
}

