// TODO oauth 2
const grpc = require('grpc');
const validator = require('validator');

const bottle = require('../util/bottle');
const errorHandler = require('../util/errorHandler');

// Dependencies types
/* eslint-disable-next-line no-unused-vars */
const { Repository } = require('typeorm');
/* eslint-disable-next-line no-unused-vars */
const Logic = require('./logic');

const PASSWORD_LENGTH = { min: 8, max: 64 };

class Api {
    /**
     * @param {Logic} logic
     * @param {Repository} userRepository
     */
    constructor(logic, userRepository) {
        this.logic = logic;
        this.userRepository = userRepository;
    }

    async signUp(call, callback) {
        const { email, password, firstName, lastName } = call.request;

        if (!email || !validator.isEmail(email)) {
            const status = grpc.status.INVALID_ARGUMENT;
            return errorHandler(callback, status, 'Invalid email');
        }

        if (!password || !validator.isLength(password, PASSWORD_LENGTH)) {
            const status = grpc.status.INVALID_ARGUMENT;
            return errorHandler(callback, status, 'Invalid password');
        }

        if (!firstName || !lastName) {
            const status = grpc.status.INVALID_ARGUMENT;
            return errorHandler(callback, status, 'Invalid first or last name');
        }

        let existingUser;
        try {
            existingUser = await this.userRepository.findOne({
                where: { email }
            });
        } catch (error) {
            const status = grpc.status.INTERNAL;
            return errorHandler(callback, status, 'Database error', error);
        }
        if (existingUser) {
            const status = grpc.status.ALREADY_EXISTS;
            return errorHandler(callback, status, 'User already exists');
        }

        this.logic.signUp(call, callback);
    }

    logIn(call, callback) {
        const { email } = call.request;
        if (!email || !validator.isEmail(email)) {
            const status = grpc.status.INVALID_ARGUMENT;
            return errorHandler(callback, status, 'Invalid email');
        }
        this.logic.logIn(call, callback);
    }

    getUserId(call, callback) {
        const { token } = call.request;
        if (!token) {
            const status = grpc.status.INVALID_ARGUMENT;
            return errorHandler(callback, status, 'Invalid token');
        }
        this.logic.getUserId(call, callback);
    }
}

bottle.service('Service.Api', Api, 'Service.Logic', 'UserRepository');

module.exports = Api;
