const { EntitySchema } = require('typeorm');

const Resource = require('../models/resource');

const ResourceSchema = new EntitySchema({
    name: 'Resource',
    tableName: 'resources',
    target: Resource,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        path: {
            type: 'varchar'
        }
    }
});

module.exports = ResourceSchema;
