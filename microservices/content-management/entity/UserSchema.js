const EntitySchema = require('typeorm').EntitySchema;
const User = '../model/User'.User;

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
            name: 'first_name',
            type: 'varchar',
        },
        lastName: {
            name: 'last_name',
            type: 'varchar',
        },
    },
    relations: {
        teacher: {
            target: 'Teacher',
            inverseSide: 'user',
            type: 'one-to-one',
            cascade: true,
        },
    },
});
