module.exports = (sequelize, DataTypes) => {

    const NotificationDetail  = sequelize.define('notificationDetails', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },

        // notification_id: {
        //     type: DataTypes.DOUBLE,
        //     allowNull: false,
        // },

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
        
    }, {
        timestamps: false,
    });

    return NotificationDetail;
}
    

