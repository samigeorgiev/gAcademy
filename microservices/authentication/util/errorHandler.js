const grpc = require('grpc');

const logger = require('./logger');

const errorHandler = (callback, status, message, error) => {
    const grpcStatus = status || grpc.status.INTERNAL;
    let metadata;
    if (message) {
        metadata = new grpc.Metadata();
        metadata.set('message', message);
    }
    callback(grpcStatus, null);

    if (status === grpc.status.INTERNAL) {
        logger.warn(message);
    } else {
        logger.info(message);
    }
    if (error) {
        logger.error(error.stack);
    }
};

module.exports = errorHandler;
