const grpc = require('grpc');

const {getRepository} = require('typeorm');

const errorHandler = require('../../util/errorHandler');
const Course = require('../../entity/CourseSchema');

exports.newCourse = async (call, callback) => {
    const {title, description, categoryId, teacherId} = call.request;

    const courseRepository = getRepository(Course);
    const course = await courseRepository.insert({
        title: title,
        description: description,
    });
    const courseId = course.raw[0].id;

    await courseRepository
        .createQueryBuilder()
        .update(Course)
        .set({categories: categoryId, teachers: teacherId})
        .where('id = :id', {id: courseId})
        .execute();
};

exports.getCourse = async (call, callback) => {
    const {id} = call.request;
    const courseRepository = getRepository(Course);

    try {
        course = await courseRepository
            .find({
                relations: ['categories', 'teachers'],
                where: {id: id},
                order: {id: 'ASC', title: 'ASC'},
            });
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Category does not exist', error);
    }
    course = course[0];
    callback(null, course);
};

exports.getCoursesByCategory = async (call, callback) => {
    const coursesRepository = getRepository(Course);

    try {
        courses = await coursesRepository
            .find({
                relations: ['categories', 'teachers'],
                where: {categories: call.request},
                order: {id: 'ASC', title: 'ASC'},
            });
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Category does not exist', error);
    }
    callback(null, {courses});
};
