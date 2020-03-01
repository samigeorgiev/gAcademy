const bcrypt = require('bcrypt');
const grpc = require('grpc');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('../models/user');

const PASSWORD_LENGTH = { min: 8, max: 64 };
const SALT_ROUNDS = 10;

exports.signUp = async (call, callback) => {    
    let { email, password, firstName, lastName, accountType, gender } = call.request;

    if (
        (!email || !password || !firstName || !lastName || accountType === 'NOT_SET') ||
        (!validator.isEmail(email) || !validator.isLength(password, PASSWORD_LENGTH))
    ) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }

    email = validator.normalizeEmail(email);
    try {
        password = await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        return callback(grpc.status.INTERNAL, null);
    }

    try {
        if (await User.findOne({ where: { email }})) {
            return callback(grpc.status.ALREADY_EXISTS, null);
        }
    } catch (error) {
        return callback(grpc.status.INTERNAL, null);
    }

    let user;
    try {
        user = await User.create({ email, password, firstName, lastName, accountType, gender });
    } catch (error) {
        return callback(grpc.status.INTERNAL, null);
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_VALID_TIME }
    );
    callback(null, { token, expiresIn: process.env.JWT_VALID_TIME, userId: user.id });
};

exports.logIn = async (call, callback) => {
    let { email, password } = call.request;
    if (!email || !password || !validator.isEmail(email)) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }
    email = validator.normalizeEmail(email);

    let user;
    try {
        user = await User.findOne({ where: { email }});
    } catch (error) {
        return callback(grpc.status.INTERNAL);
    }

    if (!user) {
        return callback(grpc.status.NOT_FOUND, null);
    }

    try {
        if (!(await bcrypt.compare(password, user.password))) {
            return callback(grpc.status.UNAUTHENTICATED, null);
        }
    } catch (error) {
        return callback(grpc.status.INTERNAL, null);
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_VALID_TIME }
    );
    callback(null, { token, expiresIn: process.env.JWT_VALID_TIME, userId: user.id });
};