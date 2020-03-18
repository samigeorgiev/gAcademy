const grpc = require('grpc');

const Course = require('../../models/course');

exports.browseCourse = async (call, callback) => {
    const {name, category, duration, teacher} = call.request;

    // let course;
    try {
        course = await Course.create({
            name,
            category,
            duration,
            teacher,
        });
    } catch (error) {
        console.log(error);
        return callback(grpc.status.INTERNAL, null);
    }
};
