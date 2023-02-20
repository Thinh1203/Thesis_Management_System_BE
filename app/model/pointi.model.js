module.exports = (sequelize, DataTypes) => {

    const PointI  = sequelize.define('pointI', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        // topic_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },

        score: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },

        grade: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        
    }, {
        timestamps: false,
    });

    return PointI;
}

