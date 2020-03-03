const grpc = require('grpc');

const service = require('./service');

exports.getUser = (call, callback) => {
    const {token} = call.request;
    if (!token) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }
    service.getUser(call, callback);
};
