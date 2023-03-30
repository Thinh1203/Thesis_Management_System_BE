module.exports = (sequelize, DataTypes) => {
    const Transcript  = sequelize.define('transcripts', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        
        score: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        }
    }, {
        timestamps: false,
    });

    return Transcript;
}
