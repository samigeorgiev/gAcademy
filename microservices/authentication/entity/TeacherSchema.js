const {EntitySchema} = require('typeorm');

const Teacher = require('../model/teacher');

const TeacherSchema = new EntitySchema({
    name: 'Teacher',
    tableName: 'Teachers',
    target: Teacher,
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

module.exports = TeacherSchema;
