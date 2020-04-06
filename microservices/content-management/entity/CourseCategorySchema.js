const EntitySchema = require('typeorm').EntitySchema;
const CourseCategory = '../model/CourseCategory'.CourseCategory;

module.exports = new EntitySchema({
    name: 'CourseCategory',
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
        course: {
            target: 'Course',
            type: 'many-to-one',
            joinColumn: { name: 'course_id' },
            eager: true,
        },
        category: {
            target: 'Category',
            type: 'many-to-one',
            joinColumn: { name: 'category_id' },
        },
    },
});
