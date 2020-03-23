const path = require('path');

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const {createConnection} = require('typeorm');
const {getConnection} = require('typeorm');

const CourseService = require('./service/Course');

require('./model/user');
require('./model/course');
require('./model/category');
require('./model/teacher');

const protoDefinition =
    protoLoader.loadSync(path.join(__dirname, process.env.PROTO_PATH), {
        keepCase: true,
        enums: String,
        defaults: true,
    });
const protoDescriptor = grpc.loadPackageDefinition(protoDefinition);

const server = new grpc.Server();

server.addService(
    protoDescriptor.content_management.Course.service,
    CourseService,
);

const port = process.env.PORT || 5432;
if (process.env.NODE_ENV === 'production') {
    // TODO create tls
} else {
    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
}

createConnection()
    .then(() => {
        server.start();
        getConnection()
            .createQueryBuilder()
            .insert()
            .into(Course)
            .values([
                {name: 'Triangle 90 60 30', duration: 60, teacher: 'Ivan', category: 'Math'}, 
                {name: 'Triangle 60 60 60', duration: 50, teacher: 'Ivan', category: 'Math'},
            ])
            .execute();
    }).catch(error => console.error(error.stack));

