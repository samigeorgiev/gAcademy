const grpc = require('grpc');

const logger = require('../../util/logger');
const service = require('./service');

exports.getUserId = (call, callback) => {
    const {token} = call.request;
    if (!token) {
        logger.warn(`Missing token in getUserId, token: ${token}`);
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }
    service.getUserId(call, callback);
};
