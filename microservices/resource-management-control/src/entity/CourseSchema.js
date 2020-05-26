const EntitySchema = require('typeorm').EntitySchema;
const Course = '../model/Course.js'.Course;

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
        creator: {
            target: 'Teacher',
            type: 'many-to-one',
            joinColumn: { name: 'creator_id' },
            cascade: true,
            eager: true,
        },
    },
});
