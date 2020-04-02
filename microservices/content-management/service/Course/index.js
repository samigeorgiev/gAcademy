const service = require('./service');

exports.newCourse = async (call, callback) => {
    service.newCourse(call, callback);
};

exports.getCourse = async (call, callback) => {
    service.getCourse(call, callback);
};

exports.getCoursesByCategory = async (call, callback) => {
    service.getCoursesByCategory(call, callback);
};
