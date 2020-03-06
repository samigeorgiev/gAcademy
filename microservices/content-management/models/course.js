const Sequelize = require('sequelize');

// eslint-disable-next-line require-jsdoc
// class User extends Sequelize.Model {}

Course.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    duration: {
        type: Sequelize.TIME,
        allowNull: true,
    },
}, {sequelize});

Course.assosiate = models => {
    Course.belognsTo(models.Category);
};
Course.assosiate = models => {
    Course.belognsTo(models.Teacher);
};

module.exports = Course;
