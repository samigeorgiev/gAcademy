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
    },
    relations: {
        users: {
            target: 'User',
            inverseSide: 'teachers',
            type: 'one-to-one',
            joinColumn: true,
            cascade: true,
            eager: true,
        },
    },
});
