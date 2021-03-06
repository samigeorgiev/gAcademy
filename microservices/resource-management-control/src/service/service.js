const grpc = require('grpc');

const { getRepository, getConnection } = require('typeorm');

const errorHandler = require('../errorHandler');
const Lecture = require('../entity/LectureSchema.js');
const Resource = require('../entity/ResourceSchema.js');
const jwt = require('jsonwebtoken');

exports.createLecture = async (call, callback) => {
    const { courseId, name } = call.request;

    let resource;
    try {
        resource = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Resource)
            .values([])
            .execute();
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }
    const resourceId = resource.raw[0].id;

    const token = jwt.sign({ resourceId: resourceId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_VALID_TIME
    });
    const url = process.env.RESOURCE_MANAGEMENT_URL + '/upload/' + token;

    try {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Lecture)
            .values([{ name: name, resource: resourceId, course: courseId }])
            .execute();
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }

    callback(null, { url });
};

exports.getLecture = async (call, callback) => {
    const { id } = call.request;

    const lectureRepository = getRepository(Lecture);

    let lecture;
    try {
        lecture = await lectureRepository.findOne(id);
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }
    if (!lecture) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'No lecture with this id');
    }

    const token = jwt.sign(
        { resourceId: lecture.resource.id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_VALID_TIME
        }
    );
    const url = process.env.RESOURCE_MANAGEMENT_URL + '/download/' + token;

    callback(null, { url });
};

exports.getAllLectures = async (call, callback) => {
    let lectures;
    try {
        lectures = await getRepository(Lecture)
            .createQueryBuilder('lecture')
            .where('lecture.course_id = :course_id', {
                course_id: call.request.courseId
            })
            .getMany();
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }
    if (!lectures && lectures.length != 0) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Id not found');
    }
    callback(null, { lectures });
};

exports.updateLectureName = async (call, callback) => {
    const { id, newName } = call.request;

    const result = await getConnection()
        .getRepository(Lecture)
        .createQueryBuilder('lecture')
        .where('lecture.id = :id', { id: id})
        .getOne();
    if (!result) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Lecture do not exists');
    }

    try {
        await getConnection()
            .createQueryBuilder()
            .update(Lecture)
            .set({ name: newName })
            .where('id = :id', { id: id })
            .execute();
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }

    callback(null);
};

exports.updateLectureResource = async (call, callback) => {
    const { id } = call.request;

    let lecture;
    try {
        lecture = await getRepository(Lecture)
            .createQueryBuilder('lecture')
            .leftJoinAndSelect('lecture.resource', 'r')
            .where('lecture.id = :id', { id: id })
            .getOne();
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }
    if (!lecture) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'No lecture');
    }
    resourceId = lecture.resource.id;
    if (!resourceId) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'No resource id');
    }

    const token = jwt.sign(
        { resourceId: resourceId },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_VALID_TIME
        }
    );
    url = process.env.RESOURCE_MANAGEMENT_URL +
    '/upload/' +
    token;

    callback(null, {url});
};

exports.deleteLecture = async (call, callback) => {
    const { id } = call.request;

    const lectureRepository = getRepository(Lecture);
    let lecture;
    try {
        lecture = await lectureRepository.findOne(id);
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }
    if (!lecture) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'No lecture with this id');
    }
    const resourceId = lecture.resource.id;

    let res;
    try {
        res = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Lecture)
            .where('id = :id', { id: id })
            .execute();
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }
    if (res.affected == 0) {
        const status = grpc.status.INVALID_ARGUMENT;
        return errorHandler(callback, status, 'No lecture with this id');
    }

    try {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Resource)
            .where('id = :id', { id: resourceId })
            .execute();
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Database error', error);
    }

    callback(null);
};
