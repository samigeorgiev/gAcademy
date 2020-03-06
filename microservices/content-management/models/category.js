const Sequelize = require('sequelize');

const sequelize = require('../util/db');

// eslint-disable-next-line require-jsdoc
class Category extends Sequelize.Model {}

Category.init({
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNUll: false,
    },
}, {sequelize});

Category.assosiate = models => {
    Category.belongsTo(models.Category, {as: 'parent'});
};

module.exports = Category;
