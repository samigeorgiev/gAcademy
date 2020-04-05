const EntitySchema = require('typeorm').EntitySchema;
const CourseCategory = ('../model/CourseCategory').CourseCategory;

module.exports = new EntitySchema({
    name: 'CategoryCourse',
    target: CourseCategory,
    tableName: 'courses_categories',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
    },
    relations: {
        courses: {
            target: 'Course',
            type: 'many-to-one',
            cascade: true,
            eager: true,
        },
        categories: {
            target: 'Category',
            type: 'many-to-one',
            cascade: true,
            eager: true,
        },
    },
});