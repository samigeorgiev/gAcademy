const service = require('./service');

exports.newCourse = async (call, callback) => {
    service.newCourse(call, callback);
    console.log(call.metadata.get('Authorization'));
    console.log(call.metadata);
};

// exports.getCourse = async (call, callback) => {
//     service.getCourse(call, callback);
// };

exports.getCoursesByCategory = async (call, callback) => {
    service.getCoursesByCategory(call, callback);
};

// exports.newLesson = async (call, callback) => {
//     service.newLesson(call, callback);
// };

// exports.getLesson = async (call, callback) => {
//     service.getLesson(call, callback);
// };

exports.getCategories = async (call, callback) => {
    service.getCategories(call, callback);
};
