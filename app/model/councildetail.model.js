module.exports = (sequelize, DataTypes) => {

    const CouncilDetail  = sequelize.define('councildetails', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    }, {
        timestamps: false,
    });

    return CouncilDetail;
}

