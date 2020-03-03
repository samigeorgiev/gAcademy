// TODO oauth 2
const grpc = require('grpc');
const validator = require('validator');

const service = require('./service');
const User = require('../../models/user');

const PASSWORD_LENGTH = {min: 8, max: 64};

exports.signUp = async (call, callback) => {
    const {email, password, firstName, lastName, accountType} = call.request;

    if (!validator.isEmail(email)) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    if (!validator.isLength(password, PASSWORD_LENGTH)) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    if (!firstName || !lastName) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    if (accountType === 'NOT_SET') {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    const user = await User.findOne({
        where: {email},
        attributes: ['accountType'],
    });
    if (user && user.accountType === accountType) {
        return callback(grpc.status.ALREADY_EXISTS, null);
    }

    service.signUp(call, callback);
};

exports.logIn = (call, callback) => {
    const {email} = call.request;
    if (!validator.isEmail(email)) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }
    service.logIn(call, callback);
};
