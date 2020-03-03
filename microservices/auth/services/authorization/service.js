const grpc = require('grpc');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

exports.getUser = async (call, callback) => {
    const {token} = call.request;

    let userId;
    try {
        userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    } catch (error) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    let user;
    try {
        user = await User.findByPk(
            userId,
            {attributes: {exclude: 'password'}},
        );
    } catch (error) {
        console.log(error);
    }

    callback(null, {user});
};
