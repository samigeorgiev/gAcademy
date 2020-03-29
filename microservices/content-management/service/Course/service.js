const grpc = require('grpc');

const {getConnection} = require('typeorm');
const {getRepository} = require('typeorm');
const errorHandler = require('../../util/errorHandler');
const Course = require('../../entity/CourseSchema');
Category = require('../../entity/CategorySchema');

exports.newCourse = async (call, callback) => {
    const {title, description} = call.request;
    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Course)
        .values([
            {title, description},
        ])
        .execute();
};

exports.getCourse = async (call, callback) => {
    const {id} = call.request;
    let course;

    const courseRepository = getConnection().getRepository(Course);
    try {
        course = await courseRepository.findOne(id);
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }
    callback(null, course);
};

exports.getCoursesByCategory = async (call, callback) => {
    const {requestedId} = call.request;

    const coursesRepository = getRepository(Course);

    try{
        courses = await coursesRepository
            .find({
                select: ['id', 'title', 'description'],
                relations: ['Category'],
                where: {Category: call.request},
                order: {id: 'ASC', title: 'ASC'},
                cache: true,
            });
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Server error', error);
    }

    callback(null, courses);
};
