const EntitySchema = require('typeorm').EntitySchema;
const Category = ('../model/Category').Category;

module.exports = new EntitySchema({
    name: 'Category',
    target: Category,
    tableName: 'categories',
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
});
