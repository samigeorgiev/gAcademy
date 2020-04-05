const grpc = require('grpc');

const {getRepository} = require('typeorm');

const errorHandler = require('../util/errorHandler');
const Course = require('../entity/CourseSchema');
const Lesson = require('../entity/LessonSchema');
const Category = require('../entity/CategorySchema');

exports.newCourse = async (call, callback) => {
    const {title, description, categoryId} = call.request;
    const courseRepository = getRepository(Course);
    const course = await courseRepository.insert({
        title: title,
        description: description,
    });
    const courseId = course.raw[0].id;

    for (i = 0; i < categoryId.length; i++) {
        await courseRepository
            .createQueryBuilder()
            .insert()
            .into('courses_categories_categories')
            .values({coursesId: courseId, categoriesId: categoryId[i]})
            .execute();
    }

    callback(null);
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

exports.newLesson = async (call, callback) => {
    const {title, content, categoryId, teacherId} = call.request;

    const lessonRepository = getRepository(Lesson);
    const lesson = await lessonRepository.insert({
        title: title,
        content: content,
    });
    const lessonId = lesson.raw[0].id;

    await lessonRepository
        .createQueryBuilder()
        .update(Lesson)
        .set({categories: categoryId, teachers: teacherId})
        .where('id = :id', {id: lessonId})
        .execute();

    callback(null);
};

exports.getLesson = async (call, callback) => {
    const {id} = call.request;
    const lessonRepository = getRepository(Lesson);

    try {
        lesson = await lessonRepository
            .find({
                relations: ['categories', 'teachers'],
                where: {id: id},
                order: {id: 'ASC', title: 'ASC'},
            });
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Lesson does not exist', error);
    }

    lesson = lesson[0];
    callback(null, lesson);
};

exports.getCategories = async (call, callback) => {
    const categoriesRepository = getRepository(Category);

    try {
        categories = await categoriesRepository
            .find({
                order: {name: 'ASC'},
            });
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'No categories.');
    }

    callback(null, {categories});
};
