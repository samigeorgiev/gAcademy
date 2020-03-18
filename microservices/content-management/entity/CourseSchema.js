const {EntitySchema} = require('typeorm');

const Course = require('../model/course');

const CourseSchema = new EntitySchema({
    name: 'Course',
    tableName: 'Courses',
    target: Course,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
        },
        duration: {
            type: 'int',
        },
    },
    relations: {
        teachers: {
            target: 'Teacher',
            type: 'many-to-one',
            joinTable: true,
            cascade: true,
        },
        categories: {
            target: 'Category',
            type: 'one-to-many',
            joinTable: true,
            cascade: true,
        },
    },
});

module.exports = CourseSchema;
