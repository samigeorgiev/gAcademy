const grpc = require('grpc');
const jwt = require('jsonwebtoken');

const logger = require('../../util/logger');
const User = require('../../models/user');

exports.getUserId = async (call, callback) => {
    const {token} = call.request;

    let userId;
    try {
        userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    } catch (error) {
        logger.warn(`Invalid token at getUserId ${token}`);
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    let user;
    try {
        user = await User.findByPk(userId, {attributes: ['id']});
    } catch (error) {
        logger.error(`Sequelize error in getUserUd: ${error.message}`);
        return callback(grpc.status.INTERNAL, null);
    }

    callback(null, {userId: user.id});
};
