// TODO oauth 2
const grpc = require('grpc');
const validator = require('validator');

const logger = require('../../logger');
const service = require('./service');
// const User = require('../../models/user');

const PASSWORD_LENGTH = {min: 8, max: 64};

exports.signUp = async (call, callback) => {
    const {email, password, firstName, lastName, accountType} = call.request;

    if (!validator.isEmail(email)) {
        logger.warn(`Invalid email: ${email}`);
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    if (!validator.isLength(password, PASSWORD_LENGTH)) {
        logger.warn(`Invalid password: ${password}`);
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    if (!firstName || !lastName) {
        logger.warn(`Invalid fn or ln: ${firstName} | ${lastName}`);
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    if (accountType === 'NOT_SET') {
        logger.warn(`Account type not set`);
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    // let user;
    // try {
    //     user = await User.findOne({
    //         where: {email},
    //         attributes: ['accountType'],
    //     });
    // } catch (error) {
    //     logger.error(`Sequelize error in signUp: ${error.message}`);
    //     return callback(grpc.status.INTERNAL, null);
    // }
    // if (user && user.accountType === accountType) {
    //     return callback(grpc.status.ALREADY_EXISTS, null);
    // }

    service.signUp(call, callback);
};

exports.logIn = (call, callback) => {
    const {email} = call.request;
    if (!validator.isEmail(email)) {
        logger.warn(`Invalid email: ${email}`);
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }
    service.logIn(call, callback);
};

exports.getUserId = (call, callback) => {
    const {token} = call.request;
    if (!token) {
        logger.warn(`Missing token in getUserId, token: ${token}`);
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }
    service.getUserId(call, callback);
};
