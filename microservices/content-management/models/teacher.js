const Sequelize = require('sequelize');

// eslint-disable-next-line require-jsdoc
class Teacher extends Sequelize.Model {}

Teacher.init({
    maxStudents: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {sequelize});

module.exports = Teacher;
