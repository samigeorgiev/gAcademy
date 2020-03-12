const Sequelize = require('sequelize');

// eslint-disable-next-line require-jsdoc
class Course extends Sequelize.Model {}

Course.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    duration: {
        type: Sequelize.TIME,
    },
}, {sequelize});

Course.assosiate = models => {
    Course.belognsTo(models.Category);
    Course.belognsTo(models.Teacher);

    Course.belognsToMany(models.Student);
};

module.exports = Course;
