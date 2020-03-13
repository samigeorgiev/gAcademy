const Sequelize = require('sequelize');

const sequelize = require('../util/db');

// eslint-disable-next-line require-jsdoc
class Student extends Sequelize.Model {}

Student.init({
    class: Sequelize.DataTypes.STRING,
}, {sequelize});

Student.associate = models => {
    Student.belongsTo(models.User);
};

module.exports = Student;
