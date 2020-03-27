const grpc = require('grpc');

const {getConnection} = require('typeorm');
const {getRepository} = require('typeorm');
const Course = require('../../entity/CourseSchema');

exports.newCourse = async (call, callback) => {
    const {title, description} = call.request;
    // const course = new Course(null, title, description, null);

    // getConnection().getRepository(Course).insert(course);
    // try {
        // await getConnection().getRepository(Course).insert(course);
    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Course)
        .values([
            { title, description },
        ])
    .execute();
    // } catch (error) {
        // const status = grpc.status.INTERNAL;
        // return errorHandler(callback, status, 'Database error', error);
    // }
};

exports.getCourse = async (call, callback) => {
    const {id} = call.request;

    const courseRepository = getConnection().getRepository(Course);

    const course = await courseRepository.findOne(id);
    console.log(course);
};
