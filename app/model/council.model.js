module.exports = (sequelize, DataTypes) => {
      
    const Council  = sequelize.define('councils', {
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

        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        chairperson: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        secretary: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        counter_agrument: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }

    }, {
        timestamps: false,
    });

    return Council;
}