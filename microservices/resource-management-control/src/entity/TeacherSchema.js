const EntitySchema = require('typeorm').EntitySchema;
const Teacher = '../model/Teacher.js'.Teacher;

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
        user: {
            target: 'User',
            type: 'one-to-one',
            joinColumn: { name: 'user_id' },
            eager: true,
        },
        courses: {
            target: 'Course',
            type: 'one-to-many',
            inverseSide: 'creator',
        },
    },
});
