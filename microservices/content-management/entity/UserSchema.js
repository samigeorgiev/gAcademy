const {EntitySchema} = require('typeorm');

const User = require('../model/User');

const UserSchema = new EntitySchema({
    name: 'User',
    tableName: 'users',
    target: User,
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
});

module.exports = UserSchema;
// const EntitySchema = require('typeorm').EntitySchema;
// const User = ('../model/User').User;

// module.exports = new EntitySchema({
//     name: 'User',
//     target: User,
//     tableName: 'users',
//     columns: {
//         id: {
//             primary: true,
//             type: 'int',
//             generated: true,
//         },
//         email: {
//             type: 'varchar',
//         },
//         password: {
//             type: 'varchar',
//         },
//         firstName: {
//             type: 'varchar',
//         },
//         lastName: {
//             type: 'varchar',
//         },
//     },
// });
