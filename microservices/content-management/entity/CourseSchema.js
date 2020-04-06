const EntitySchema = require('typeorm').EntitySchema;
const Course = '../model/Course'.Course;

module.exports = new EntitySchema({
    name: 'Course',
    target: Course,
    tableName: 'courses',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        title: {
            type: 'varchar',
        },
        description: {
            type: 'varchar',
        },
    },
    relations: {
        course_categories: {
            target: 'CourseCategory',
            type: 'one-to-many',
            inverseSide: 'course',
            cascade: true,
        },
        creator: {
            target: 'Teacher',
            type: 'many-to-one',
            joinColumn: { name: 'creator_id' },
            cascade: true,
            eager: true,
        },
    },
});
