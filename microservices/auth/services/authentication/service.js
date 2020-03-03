const bcrypt = require('bcrypt');
const grpc = require('grpc');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

const SALT_ROUNDS = 10;

exports.signUp = async (call, callback) => {
    const {email, password, firstName, lastName, accountType} = call.request;

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        console.log(error);
    }

    let user;
    try {
        user = await User.create({
            email,
            firstName,
            lastName,
            accountType,
            password: hashedPassword,
        });
    } catch (error) {
        console.log(error);
    }

    const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_VALID_TIME},
    );

    callback(null, {token, expiresIn: process.env.JWT_VALID_TIME});
};

exports.logIn = async (call, callback) => {
    const {email, password} = call.request;

    let user;
    try {
        user = await User.findOne({
            where: {email},
            attributes: ['id', 'password'],
        });
    } catch (error) {
        console.log(error);
    }
    if (!user) {
        return callback(grpc.status.NOT_FOUND, null);
    }

    try {
        if (!(await bcrypt.compare(password, user.password))) {
            return callback(grpc.status.UNAUTHENTICATED, null);
        }
    } catch (error) {
        console.log(error);
    }

    const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_VALID_TIME},
    );

    callback(null, {token, expiresIn: process.env.JWT_VALID_TIME});
};
