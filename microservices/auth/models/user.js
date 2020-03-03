const Sequelize = require('sequelize');

const sequelize = require('../util/db');

// eslint-disable-next-line require-jsdoc
class User extends Sequelize.Model {}

User.init({
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        // eslint-disable-next-line new-cap
        type: Sequelize.DataTypes.ENUM('NOT_SET', 'MALE', 'FEMALE', 'OTHER'),
        allowNull: false,
    },
    accountType: {
        // eslint-disable-next-line new-cap
        type: Sequelize.DataTypes.ENUM('STUDENT', 'TEACHER'),
        allowNull: false,
    },
}, {sequelize});

module.exports = User;
