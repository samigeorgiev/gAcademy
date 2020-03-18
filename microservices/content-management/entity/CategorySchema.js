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
        relations: {
            childCategories: {
                target: 'Category',
                type: 'many-to-one',
                joinTable: true,
                cascade: true,
            },
        },
    },
});

module.exports = CategorySchema;
