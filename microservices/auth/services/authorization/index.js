const grpc = require('grpc');

const service = require('./service');

exports.getUserId = (call, callback) => {
    const {token} = call.request;
    if (!token) {
        return callback(grpc.status.INVALID_ARGUMENT, null);
    }
    service.getUserId(call, callback);
};
