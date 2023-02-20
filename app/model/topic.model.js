module.exports = (sequelize, DataTypes) => {
    const Topic  = sequelize.define('topics', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        // instructor_code: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false, 
        // },
        // shool_year_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,           
        // },

        vietnamese_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        english_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        student_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        mssv: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        instructor: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        start_date: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        end_date: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        
    }, {
        timestamps: false,
    });

    return Topic;
}
