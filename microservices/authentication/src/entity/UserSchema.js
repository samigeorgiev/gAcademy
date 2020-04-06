const { EntitySchema } = require('typeorm');

const User = require('../model/user');

const UserSchema = new EntitySchema({
    name: 'User',
    tableName: 'users',
    target: User,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        email: {
            type: 'varchar'
        },
        password: {
            type: 'varchar'
        },
        firstName: {
            name: 'first_name',
            type: 'varchar'
        },
        lastName: {
            name: 'last_name',
            type: 'varchar'
        }
    }
});

module.exports = UserSchema;
