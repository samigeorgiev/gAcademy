const grpc = require('grpc');

const { getRepository } = require('typeorm');

const errorHandler = require('../util/errorHandler');
const Course = require('../entity/CourseSchema');
const Category = require('../entity/CategorySchema');
const Teacher = require('../entity/TeacherSchema');

exports.newCourse = async (call, callback) => {
    const { title, description, categoriesIds } = call.request;

    const categories = await getRepository(Category).findByIds(categoriesIds);
    const teacher = await getRepository(Teacher).findOne();
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
    const course = await getRepository(Course)
        .createQueryBuilder('courses')
        .select('courses.id', 'id')
        .addSelect('courses.title', 'title')
        .addSelect('courses.description', 'description')
        .addSelect('t.id', 'creator_id')
        .addSelect('u.firstName', 'firstName')
        .addSelect('u.lastName', 'lastName')
        .addSelect('cc.category_id', 'category_id')
        .addSelect('ct.name', 'category_name')
        .leftJoin('courses.creator', 't')
        .leftJoin('t.user', 'u')
        .leftJoin('courses.course_categories', 'cc')
        .leftJoin('cc.category', 'ct')
        .where('courses.id = :id', { id: call.request.id })
        .getRawMany();
    modifiedCourse = {
        id: course[0].id,
        title: course[0].title,
        description: course[0].description,
        categories: [],
    };
    for (let i = 0; i < course.length; i++) {
        category = {
            id: course[i].category_id,
            name: course[i].category_name,
        };
        modifiedCourse.categories.push(category);
    }
    callback(null, modifiedCourse);
};

exports.getCoursesByCategory = async (call, callback) => {
    downloadCourses = await getRepository(Course)
        .createQueryBuilder('courses')
        .select('courses.id', 'id')
        .addSelect('courses.title', 'title')
        .addSelect('courses.description', 'description')
        .addSelect('cc.category_id', 'category_id')
        .addSelect('t.id', 'teacherId')
        .addSelect('u.firstName', 'firstName')
        .addSelect('u.lastName', 'lastName')
        .leftJoin('courses.course_categories', 'cc')
        .leftJoin('courses.creator', 't')
        .leftJoin('t.user', 'u')
        .where('cc.category_id = :category_id', {category_id: call.request.id})
        .getRawMany();

    newCourse = {
        id: null,
        title: null,
        description: null,
        teacher: {
            id: null,
            name: null,
        },
    };
    courses = [];
    for (let i = 0; i < downloadCourses.length; i++) {
        courses.push(newCourse);
        courses[i] = {
            id: downloadCourses[i].id,
            title: downloadCourses[i].title,
            description: downloadCourses[i].description,
            teacher: {
                id: downloadCourses[i].teacherId,
                name:
                downloadCourses[i].firstName +
                ' ' +
                downloadCourses[i].lastName,
            },
        };
    }
    callback(null, {courses});
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
