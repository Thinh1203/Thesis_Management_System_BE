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
            type: DataTypes.STRING,
            allowNull: false,
        }
        
    }, {
        timestamps: false,
    });

    return SchoolYear;
}

