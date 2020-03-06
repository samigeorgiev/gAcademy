const Sequelize = require('sequelize');

// eslint-disable-next-line require-jsdoc
// class User extends Sequelize.Model {}

Course.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    teacher: {
        type: Sequelize.STRING,
    },
}, {sequelize});

module.exports = Course;
