const service = require('./service');
const grpc = require('grpc');
const errorHandler = require('../errorHandler.js');

exports.createLecture = (call, callback) => {
    const { courseId, name } = call.request;
    if (!courseId) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'Blank request');
    }
    if (!name) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'Blank request');
    }

    service.createLecture(call, callback);
};

exports.getLecture = (call, callback) => {
    const { id } = call.request;
    if (!id) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'Blank request');
    }

    service.getLecture(call, callback);
};

exports.getAllLectures = (call, callback) => {
    const { courseId } = call.request;
    if (!courseId) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'Blank request');
    }

    service.getAllLectures(call, callback);
};
