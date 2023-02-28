module.exports = (sequelize, DataTypes) => {

    const NotificationDetail  = sequelize.define('notificationDetails', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

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
    

