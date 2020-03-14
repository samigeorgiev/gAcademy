const grpc = require('grpc');

const errorHandler = (callback, status, message, error) => {
    const grpcStatus = status || grpc.status.INTERNAL;
    let metadata;
    if (message) {
        metadata = new grpc.Metadata();
        metadata.set('message', message);
    }
    // TODO log error
    console.log(error);
    callback(grpcStatus, null);
};

module.exports = errorHandler;
