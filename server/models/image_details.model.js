
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Image_Details', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fileName: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        size: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        fileType: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        url: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });
};