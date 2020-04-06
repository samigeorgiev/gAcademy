// const EntitySchema = require('typeorm').EntitySchema;
// const Lesson = ('../model/Lesson').Lesson;

// module.exports = new EntitySchema({
//     name: 'Lesson',
//     target: Lesson,
//     tableName: 'lessons',
//     columns: {
//         id: {
//             primary: true,
//             type: 'int',
//             generated: true,
//         },
//         title: {
//             type: 'varchar',
//         },
//         content: {
//             type: 'varchar',
//         },
//     },
//     relations: {
//         categories: {
//             target: 'Category',
//             type: 'many-to-one',
//             joinColumn: true,
//             cascade: true,
//         },
//         teachers: {
//             target: 'Teacher',
//             type: 'many-to-one',
//             joinColumn: true,
//             cascade: true,
//         },
//     },
// });
