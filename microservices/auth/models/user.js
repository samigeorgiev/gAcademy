const { Model, DataTypes } = require('sequelize');

const sequelize = require('../db');

class User extends Model {}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('NOT_SET', 'MALE', 'FEMALE', 'OTHER'),
        allowNull: false
    },
    accountType: {
        type: DataTypes.ENUM('STUDENT', 'TEACHER'),
        allowNull: false
    }
}, { sequelize });

module.exports = User;