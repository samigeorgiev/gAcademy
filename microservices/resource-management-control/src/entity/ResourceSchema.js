const EntitySchema = require('typeorm').EntitySchema;
const Resource = '../model/Resource.js'.Resource;

module.exports = new EntitySchema({
    name: 'Resource',
    target: Resource,
    tableName: 'resources',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        path: {
            type: 'varchar',
            nullable: true,
        },
    },
    relations: {
        lecture: {
            target: 'Resource',
            inverseSide: 'resource',
            type: 'one-to-one',
        },
    },
});
