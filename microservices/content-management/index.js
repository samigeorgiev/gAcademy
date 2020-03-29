const path = require('path');

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const {createConnection} = require('typeorm');
// const {getConnection} = require('typeorm');

const CourseService = require('./service/Course');
// const CourseSchema = require('./entity/CourseSchema')

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

const port = process.env.PORT || 9001;
if (process.env.NODE_ENV === 'production') {
    // TODO create tls
} else {
    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
}

createConnection()
    .then(() => {
        server.start();
    }).catch(error => console.error(error.stack));

