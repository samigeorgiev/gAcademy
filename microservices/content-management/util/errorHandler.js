const grpc = require('grpc');

const errorHandler = (callback, status, message, error) => {
    const grpcStatus = status || grpc.status.INTERNAL;
    let metadata;
    if (message) {
        metadata = new grpc.Metadata();
        metadata.set('message', message);
    }
    callback(grpcStatus, null);

    if (status === grpc.status.INTERNAL) {
        console.warn(message);
        if (error) {
            console.error(error.stack);
        }
    } else {
        console.info(message);
    }
};

module.exports = errorHandler;
