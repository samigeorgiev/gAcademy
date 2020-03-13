const Sequelize = require('sequelize');

const sequelize = require('../util/db');

// eslint-disable-next-line require-jsdoc
class Teacher extends Sequelize.Model {}

Teacher.init({
    maxStudents: Sequelize.DataTypes.INTEGER
}, {sequelize});

Teacher.associate = models => {
    Teacher.belongsTo(models.User);
}

module.exports = Teacher;