const grpc = require('grpc');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signUp = async (call, callback) => {    
    const { email, password, firstName, lastName, accountType, gender } = call.request;

    if (!email || !password || !firstName || !lastName || accountType === 'NOT_SET') {
        console.log(123);
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }
    if (await User.findOne({ where: { email }})) {
        return callback(grpc.status.ALREADY_EXISTS, null);
    }

    const user = 
        await User.create({ email, password, firstName, lastName, accountType, gender });
    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_VALID_TIME }
    );
    callback(null, { token, expiresIn: process.env.JWT_VALID_TIME, userId: user.id });
};

exports.logIn = (call, callback) => {

};