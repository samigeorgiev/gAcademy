const service = require('./service');

exports.createLecture = async (call, callback) => {
    service.createLecture(call, callback);
};

exports.getLecture = async (call, callback) => {
    service.getLecture(call, callback);
};

exports.getAllLectures = async (call, callback) => {
    service.getAllLectures(call, callback);
};
