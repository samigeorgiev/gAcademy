const EntitySchema = require('typeorm').EntitySchema;
const Lecture = '../model/Lecture.js'.Lecture;

module.exports = new EntitySchema({
    name: 'Lecture',
    target: Lecture,
    tableName: 'lectures',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
        },
    },
    relations: {
        resource: {
            target: 'Lecture',
            inverseSide: 'lecture',
            type: 'one-to-one',
            joinColumn: true,
            cascade: true,
            eager: true,
        },
        course: {
            target: 'Course',
            type: 'many-to-one',
            joinColumn: true,
            cascade: true,
            eager: true,
        }
    },
});
