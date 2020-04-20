const Bottle = require('bottlejs');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bottle = new Bottle();

bottle.factory('Bcrypt', () => bcrypt);
bottle.factory('JWT', () => jwt);

module.exports = bottle;
