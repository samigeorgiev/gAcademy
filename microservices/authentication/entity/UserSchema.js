const {EntitySchema} = require('typeorm');

const User = require('../model/user');

const UserSchema = new EntitySchema({
    name: 'User',
    tableName: 'Users',
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
        accountType: {
            type: 'enum',
            enum: ['STUDENT', 'TEACHER'],
        },
    },
});

module.exports = UserSchema;
