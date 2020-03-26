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
        creator: {
            type: 'int',
        },
    },
});
