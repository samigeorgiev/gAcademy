const EntitySchema = require('typeorm').EntitySchema;
const Teacher = ('../model/Teacher').Teacher;

module.exports = new EntitySchema({
    name: 'Teacher',
    target: Teacher,
    tableName: 'teachers',
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
