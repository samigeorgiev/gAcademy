const grpc = require('grpc');
const {getRepository} = require('typeorm');

const service = require('./service');
const Course = require('../../model/course');
const Category = require('../../model/category');

exports.newCourse = async (call, callback) => {
    const {name, category, teacher} = call.request;

    let categoryAuth;
    try {
        categoryAuth = await Category.findOne({
            where: {name: category},
        });
    } catch (error) {
        console.error(`No such category: ${category}`);
        return callback(grpc.status.INTERNAL, null);
    }

    let teacherAuth;
    try {
        teacherAuth = await User.findOne({
            where: {name: teacher},
        });
    } catch (error) {
        console.error(`Teacher does not exist: ${teacher}`);
        return callback(grpc.status.INTERNAL, null);
    }
};
