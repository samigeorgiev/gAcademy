const grpc = require('grpc');

const { getRepository } = require('typeorm');
const { getConnection } = require('typeorm');

const errorHandler = require('../errorHandler');
const Lecture = require('../entity/LectureSchema.js');
const Resource = require('../entity/ResourceSchema.js');

exports.createLecture = async (call, callback) => {
    const { courseId, name, url } = call.request;

    const resource = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Resource)
        .values([
            {path: url},
        ])
        .execute();
    const resourceId = resource.raw[0].id;

    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Lecture)
        .values([
            { name: name, resource: resourceId, course: courseId },
        ])
        .execute();

    callback(null);
};

exports.getLecture = async (call, callback) => {
    const { id } = call.request;

    let lectureRepository;
    try {
        lectureRepository = getRepository(Lecture);
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error1', error);
    }

    let downloadLecture;
    try {
        downloadLecture = await lectureRepository.findOne(id);
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error2', error);
    }

    let lecture;
    try {
        lecture = {
            id: downloadLecture.id,
            name: downloadLecture.name,
        };
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error3', error);
    }

    callback(null, {lecture});
};

exports.getAllLectures = async (call, callback) => {
    let lectures;
    try {
        lectures = await getRepository(Lecture)
            .createQueryBuilder('lecture')
            .where('lecture.course_id = :courseId',
                { courseId: call.request.courseId })
            .getMany();
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }
    if (!lectures || !lectures.length) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Id not found');
    }
    callback(null, {lectures});
};
