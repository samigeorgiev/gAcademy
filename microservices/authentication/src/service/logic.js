// TODO logging
const grpc = require('grpc');

const bottle = require('../util/bottle');
const errorHandler = require('../util/errorHandler');
const User = require('../models/user');

// Dependencies types
/* eslint-disable-next-line no-unused-vars */
const { Repository } = require('typeorm');
/* eslint-disable-next-line no-unused-vars */
const JWT = require('jsonwebtoken');
/* eslint-disable-next-line no-unused-vars */
const Bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

class Logic {
    /**
     * @param {Repository} userRepository
     * @param {Bcrypt} bcrypt
     * @param {JWT} jwt
     */
    constructor(userRepository, bcrypt, jwt) {
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.jwt = jwt;
    }

    async signUp(call, callback) {
        const { email, password, firstName, lastName } = call.request;

        let hashedPassword;
        try {
            hashedPassword = await this.bcrypt.hash(password, SALT_ROUNDS);
        } catch (error) {
            const status = grpc.status.INTERNAL;
            return errorHandler(callback, status, 'Server error', error);
        }

        const user = new User(null, email, hashedPassword, firstName, lastName);

        let createdUser;
        try {
            createdUser = await this.userRepository.save(user);
        } catch (error) {
            const status = grpc.status.INTERNAL;
            return errorHandler(callback, status, 'Database error', error);
        }

        const token = this.jwt.sign(
            { userId: createdUser.id },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_VALID_TIME
            }
        );

        callback(null, { token, expiresIn: process.env.JWT_VALID_TIME });
    }

    async logIn(call, callback) {
        const { email, password } = call.request;

        let user;
        try {
            user = await this.userRepository.findOne({
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
            if (!(await this.bcrypt.compare(password, user.password))) {
                const status = grpc.status.UNAUTHENTICATED;
                return errorHandler(callback, status, 'Incorrect password');
            }
        } catch (error) {
            const status = grpc.status.INTERNAL;
            return errorHandler(callback, status, 'Server error', error);
        }

        const token = this.jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_VALID_TIME
            }
        );

        callback(null, { token, expiresIn: process.env.JWT_VALID_TIME });
    }

    async getUserId(call, callback) {
        const { token } = call.request;

        let userId;
        try {
            userId = this.jwt.verify(token, process.env.JWT_SECRET).userId;
        } catch (error) {
            const status = grpc.status.UNAUTHENTICATED;
            return errorHandler(callback, status, 'Invalid token', error);
        }

        let user;
        try {
            user = await this.userRepository.findOne({
                select: ['id'],
                where: { id: userId }
            });
        } catch (error) {
            const status = grpc.status.INTERNAL;
            return errorHandler(callback, status, 'Database error', error);
        }
        if (!user) {
            const status = grpc.status.NOT_FOUND;
            return errorHandler(
                callback,
                status,
                'User id in token is invalid'
            );
        }

        callback(null, { userId: user.id });
    }
}

bottle.service('Service.Logic', Logic, 'UserRepository', 'Bcrypt', 'JWT');

module.exports = Logic;
