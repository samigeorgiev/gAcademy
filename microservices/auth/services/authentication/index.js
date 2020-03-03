const grpc = require('grpc');
const validator = require('validator');

const service = require('./service');
const User = require('../../models/user');

const PASSWORD_LENGTH = { min: 8, max: 64 };

exports.signUp = async (call, callback) => {
    const { user, password } = call.request;

    if (!user) {
        return callback(grpc.status.INVALID_ARGUMENT, {});
    }

    if (!validator.isEmail(user.email)) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }
    user.email = validator.normalizeEmail(user.email);

    if (!validator.isLength(password, PASSWORD_LENGTH)) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    if (!user.firstName || !user.lastName) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    if (user.accountType === 'NOT_SET') {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    const existingUser = await User.findOne({
        where: { email: user.email },
        attributes: [ 'accountType' ]
    });
    if (existingUser && existingUser.accountType === user.accountType) {
        return callback(grpc.status.ALREADY_EXISTS, null);
    }

    service.signUp(call, callback);
};

exports.logIn = (call, callback) => {
    let { email } = call.request;
    if (!validator.isEmail(email)) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }
    email = validator.normalizeEmail(email);
    service.logIn(call, callback);
};