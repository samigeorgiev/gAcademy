// const grpc = require('grpc');

const { getRepository } = require('typeorm');
const { getConnection } = require('typeorm');

// const errorHandler = require('../util/errorHandler');
const Lecture = require('../entity/LectureSchema.js');
const Resource = require('../entity/ResourceSchema.js');

exports.createLecture = async (call, callback) => {
    const { courseId, name, url } = call.request;

    const resource = {
        path: url,
    };
    await getRepository(Resource).save(resource);
    const madeResource = await getRepository(Resource)
        .createQueryBuilder('resource')
        .where('resource.path = :path', { path: call.request.url })
        .getOne();
    const resourceId = madeResource.id;

    const lecture = {
        name,
        resourceId,
        courseId,
    };
    console.log(lecture);

    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Lecture)
        .values([{
            name: lecture.name,
            resourceId: lecture.resourceId,
            courseId: lecture.courseId,
        }])
        .execute();

    callback(null);
};

exports.getAllLectures = async (call, callback) => {
    // const { courseId } = call.request;

    const lectures = await getRepository(Lecture)
        .createQueryBuilder('lecture')
        .leftJoinAndSelect('lecture.resource', 'r')
        .where('lecture.course_id = :courseId',
            { courseId: call.request.courseId })
        .getMany();

    console.log(lectures);

    callback(null, {lectures});
};
