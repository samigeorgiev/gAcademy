const Sequelize = require('sequelize');

// eslint-disable-next-line require-jsdoc
class Student extends Sequelize.Model {}

Student.init({
    class: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {sequelize});
Student.assosiate = models => {
    Student.belongsToMany(models.Course);
};

module.exports = Student;
