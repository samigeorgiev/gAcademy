const Sequelize = require('sequelize');

const logging = process.env.NODE_ENV !== 'production' ? console.log : false;
const sequelize = new Sequelize(process.env.DB_CONNECTION, {logging});

module.exports = sequelize;
