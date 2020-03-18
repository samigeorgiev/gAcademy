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
        name: {
            type: 'varchar',
        },
        maxStudents: {
            type: 'int',
        },
    },
});

module.exports = TeacherSchema;
