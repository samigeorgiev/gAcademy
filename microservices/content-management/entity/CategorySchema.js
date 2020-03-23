const {EntitySchema} = require('typeorm');

const Category = require('../model/category');

const CategorySchema = new EntitySchema({
    name: 'Category',
    tableName: 'Categories',
    target: Category,
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

module.exports = CategorySchema;
