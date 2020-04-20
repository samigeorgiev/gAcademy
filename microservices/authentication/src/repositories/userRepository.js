const { getRepository } = require('typeorm');

const bottle = require('../util/bottle');
const User = require('../model/user');

bottle.factory('UserRepository', () => getRepository(User));
