// const grpc = require('grpc');
// const {getRepository} = require('typeorm');

// const errorHandler = require('../../util/errorHandler');

const service = require('./service');
// const Course = require('../../model/Course');

exports.newCourse = async (call, callback) => {
    // const {title, description} = call.request;

    service.newCourse(call, callback);

    console.log(call);
};

exports.getCourse = async (call, callback) => {
    // const {id} = call.request;

    service.getCourse(call, callback);
};

exports.getCoursesByCategory = async (call, callback) => {
    
    service.getCoursesByCategory(call, callback);
};
