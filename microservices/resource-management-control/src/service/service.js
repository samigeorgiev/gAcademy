// const grpc = require('grpc');

const { getRepository } = require('typeorm');
const { getConnection } = require('typeorm');

// const errorHandler = require('../util/errorHandler');
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

    const lectureRepository = getRepository(Lecture);
    const downloadLecture = await lectureRepository.findOne(id);

    const lecture = {
        id: downloadLecture.id,
        name: downloadLecture.name,
    };

    callback(null, {lecture});
};

exports.getAllLectures = async (call, callback) => {
    const lectures = await getRepository(Lecture)
        .createQueryBuilder('lecture')
        .where('lecture.course_id = :courseId',
            { courseId: call.request.courseId })
        .getMany();

    callback(null, {lectures});
};
