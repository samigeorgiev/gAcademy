const EntitySchema = require('typeorm').EntitySchema;
const Teacher = ('../model/Teacher').Teacher;
// const User = ('../model/User').User;

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
    // relations: {
    //     User: {
    //         target: 'User',
    //         inverseSide: 'user.teacher',
    //         type: 'one-to-one',
    //         joinColumn: true,
    //     },
    // },
    // TODO relation to 'users'
});
