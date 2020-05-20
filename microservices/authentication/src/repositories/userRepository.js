const { getRepository } = require('typeorm');

const bottle = require('../util/bottle');
const User = require('../models/user');

bottle.factory('UserRepository', () => getRepository(User));
