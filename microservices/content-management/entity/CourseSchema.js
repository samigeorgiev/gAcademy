const EntitySchema = require('typeorm').EntitySchema;
const Course = ('../model/Course').Course;

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
        categories: {
            target: 'Category',
            type: 'many-to-one',
            joinColumn: true,
            cascade: true,
        },
        teachers: {
            target: 'Teacher',
            type: 'many-to-one',
            joinColumn: true,
            cascade: true,
        },
    },
});
