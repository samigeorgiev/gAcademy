const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_CONNECTION);

module.exports = sequelize;