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
        type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER')
    },
    accountType: {
        type: DataTypes.ENUM('STUDENT', 'TEACHER'),
        allowNull: false
    }
}, { sequelize });