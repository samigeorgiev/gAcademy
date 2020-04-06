const grpc = require('grpc');

const { getRepository } = require('typeorm');

const errorHandler = require('../util/errorHandler');
const Course = require('../entity/CourseSchema');
const Lesson = require('../entity/LessonSchema');
const Category = require('../entity/CategorySchema');
const CourseCategories = require('../entity/CourseCategorySchema');
const Teacher = require('../entity/TeacherSchema');

exports.newCourse = async (call, callback) => {
    const { title, description, categoriesIds } = call.request;

    const categories = await getRepository(Category).findByIds(categoriesIds);
    const teacher = await getRepository(Teacher).findOne(3);
    const course = {
        title,
        description,
        course_categories: categories.map((category) => ({ category })),
        creator: teacher,
    };

    await getRepository(Course).save(course);

    callback(null);
};

exports.getCourse = async (call, callback) => {
    const { id } = call.request;
    const courseRepository = getRepository(Course);

    try {
        course = await courseRepository.find({
            relations: ['categories', 'teachers'],
            where: { id: id },
            order: { id: 'ASC', title: 'ASC' },
        });
    } catch (error) {
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'Category does not exist', error);
    }

    course = course[0];
    callback(null, course);
};

exports.getCoursesByCategory = async (call, callback) => {
    const courseCategories = await getRepository(CourseCategories).find({
        where: { categoryId: call.request.id },
    });
    const courses = courseCategories.map((cc) => ({
        id: cc.course.id,
        title: cc.course.title,
        description: cc.course.description,
        teacher: {
            id: cc.course.creator.id,
            name:
                cc.course.creator.user.firstName +
                ' ' +
                cc.course.creator.user.lastName,
        },
    }));
    callback(null, { courses });
};

exports.newLesson = async (call, callback) => {
    const { title, content, categoryId, teacherId } = call.request;

    const lessonRepository = getRepository(Lesson);
    const lesson = await lessonRepository.insert({
        title: title,
        content: content,
    });
    const lessonId = lesson.raw[0].id;

    await lessonRepository
        .createQueryBuilder()
        .update(Lesson)
        .set({ categories: categoryId, teachers: teacherId })
        .where('id = :id', { id: lessonId })
        .execute();

    callback(null);
};

exports.getLesson = async (call, callback) => {
    const { id } = call.request;
    const lessonRepository = getRepository(Lesson);

    try {
        lesson = await lessonRepository.find({
            relations: ['categories', 'teachers'],
            where: { id: id },
            order: { id: 'ASC', title: 'ASC' },
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
        categories = await categoriesRepository.find({
            order: { name: 'ASC' },
        });
    } catch (error) {
        console.log(error);
        const status = grpc.status.INTERNAL;
        return errorHandler(callback, status, 'No categories.');
    }

    callback(null, { categories });
};
