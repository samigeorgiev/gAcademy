const EntitySchema = require('typeorm').EntitySchema;
const Category = '../model/Category.js'.Category;

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
    relations: {
        course_categories: {
            target: 'CourseCategory',
            type: 'one-to-many',
            inverseSide: 'Category',
            cascade: true,
        },
    },
});
