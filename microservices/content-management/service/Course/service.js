const grpc = require('grpc');

const Course = require('../../model/course');

exports.newCourse = async (call, callback) => {
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
