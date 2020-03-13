const {EntitySchema} = require('typeorm');

const Student = require('../model/student');

const StudentSchema = new EntitySchema({
    name: 'Student',
    tableName: 'Students',
    target: Student,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
    },
    relations: {
        user: {
            target: 'User',
            type: 'one-to-one',
            joinColumn: true,
        },
    },
});

module.exports = StudentSchema;
