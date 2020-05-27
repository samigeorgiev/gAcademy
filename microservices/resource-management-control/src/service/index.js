const service = require('./service');
const grpc = require('grpc');
const errorHandler = require('../errorHandler.js');

exports.createLecture = async (call, callback) => {
    service.createLecture(call, callback);
};

exports.getLecture = async (call, callback) => {
    const { id } = call.request;
    if (!id || id == null) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'Blank request');
    }
    service.getLecture(call, callback);
};

exports.getAllLectures = async (call, callback) => {
    const { courseId } = call.request;
    if (!courseId || courseId == null) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'Blank request');
    }
    service.getAllLectures(call, callback);
};
