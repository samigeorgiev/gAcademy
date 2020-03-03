const grpc = require('grpc');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.getUserInfo = async (call, callback) => {
    const { token } = call.request;
    if (!token) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    let userId
    try {
        userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    } catch (error) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    let user;
    try {
        user = await User.findByPk(userId, { attributes: { exclude: 'password' }});
    } catch (error) {
        return callback(grpc.status.INTERNAL, null);
    }

    callback(null, user);
};