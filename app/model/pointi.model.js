module.exports = (sequelize, DataTypes) => {

    const PointI  = sequelize.define('pointI', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        file: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        
    }, {
        timestamps: false,
    });

    return PointI;
}

