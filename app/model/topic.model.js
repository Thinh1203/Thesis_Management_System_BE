module.exports = (sequelize, DataTypes) => {
    const Topic  = sequelize.define('topics', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },

        VietnameseName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        EnglishName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        
    }, {
        timestamps: false,
    });

    return Topic;
}
