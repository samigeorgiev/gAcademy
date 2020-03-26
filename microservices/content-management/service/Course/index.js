const grpc = require('grpc');
const {getRepository} = require('typeorm');

const errorHandler = require('../../util/errorHandler');

const service = require('./service');
const Course = require('../../model/Course');

exports.newCourse = async (call, callback) => {
    const {title, description} = call.request;

    let duplicateCourse;

    try {
        duplicateCourse =
        await getRepository(Course).findOne({where: {title, description}});
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }
    if (duplicateCourse) {
        const status = grpc.status.ALREADY_EXISTS;
        return errorHandler(callback, status, 'Course already created');
    }

    service.newCourse(call, callback);
};
