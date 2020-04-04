// TODO logging
const bcrypt = require('bcrypt');
const grpc = require('grpc');
const jwt = require('jsonwebtoken');
const { getRepository } = require('typeorm');

const errorHandler = require('../util/errorHandler');
const User = require('../model/user');

const SALT_ROUNDS = 10;

exports.signUp = async (call, callback) => {
    const { email, password, firstName, lastName } = call.request;

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Server error', error);
    }

    const user = new User(null, email, hashedPassword, firstName, lastName);

    let createdUser;
    try {
        createdUser = await getRepository(User).save(user);
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }

    const token = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_VALID_TIME
    });

    callback(null, { token, expiresIn: process.env.JWT_VALID_TIME });
};

exports.logIn = async (call, callback) => {
    const { email, password } = call.request;

    let user;
    try {
        user = await getRepository(User).findOne({
            select: ['id', 'password'],
            where: { email }
        });
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }
    if (!user) {
        const status = grpc.status.NOT_FOUND;
        return errorHandler(callback, status, 'User does not exists');
    }

    try {
        if (!(await bcrypt.compare(password, user.password))) {
            const status = grpc.status.UNAUTHENTICATED;
            return errorHandler(callback, status, 'Incorrect password');
        }
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Server error', error);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_VALID_TIME
    });

    callback(null, { token, expiresIn: process.env.JWT_VALID_TIME });
};

exports.getUserId = async (call, callback) => {
    const { token } = call.request;

    let userId;
    try {
        userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    } catch (error) {
        const status = grpc.status.UNAUTHENTICATED;
        return errorHandler(callback, status, 'Invalid token', error);
    }

    let user;
    try {
        user = await getRepository(User).findOne({
            select: ['id'],
            where: { id: userId }
        });
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }
    if (!user) {
        const status = grpc.status.NOT_FOUND;
        return errorHandler(callback, status, 'User id in token is invalid');
    }

    callback(null, { userId: user.id });
};
