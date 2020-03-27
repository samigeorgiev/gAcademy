const EntitySchema = require('typeorm').EntitySchema;
const Teacher = ('../model/Teacher').Teacher;
const User = ('../model/User').User;

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
        creator_id: {
            type: 'int',
        },
    },
    // TODO relation to 'users'
});
