const EntitySchema = require('typeorm').EntitySchema;
const User = ('../model/User').User;
// const Teacher = require('../model/Teacher');

module.exports = new EntitySchema({
    name: 'User',
    target: User,
    tableName: 'users',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        email: {
            type: 'varchar',
        },
        password: {
            type: 'varchar',
        },
        firstName: {
            type: 'varchar',
        },
        lastName: {
            type: 'varchar',
        },
    },
    // relations: {
    //     Teacher: {
    //         target: 'Teacher',
    //         inverseSide: 'user',
    //         type: 'one-to-one',
    //         joinColumn: true,
    //         cascade: true,
    //         eager: true,
    //     },
    // },
});

