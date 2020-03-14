// TODO oauth 2
const grpc = require('grpc');
const validator = require('validator');
const {getRepository} = require('typeorm');

const errorHandler = require('../../util/errorHandler');
const service = require('./service');
const User = require('../../model/user');

const PASSWORD_LENGTH = {min: 8, max: 64};

exports.signUp = async (call, callback) => {
    const {email, password, firstName, lastName, accountType} = call.request;

    if (!validator.isEmail(email)) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'Invalid email');
    }

    if (!validator.isLength(password, PASSWORD_LENGTH)) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'Invalid password');
    }

    if (!firstName || !lastName) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'Invalid first or last name');
    }

    if (accountType === 'NOT_SET') {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'Invalid account type');
    }

    let users;
    try {
        users = await getRepository(User).find({
            select: ['accountType'],
            where: {email},
        });
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }
    if (!users.every(user => user.accountType !== accountType)) {
        const status = grpc.status.ALREADY_EXISTS;
        return errorHandler(callback, status, 'User already exists');
    }

    service.signUp(call, callback);
};

exports.logIn = (call, callback) => {
    const {email} = call.request;
    if (!validator.isEmail(email)) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'Invalid email');
    }
    service.logIn(call, callback);
};

exports.getUserId = (call, callback) => {
    const {token} = call.request;
    if (!token) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'Invalid token');
    }
    service.getUserId(call, callback);
};
