const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const {createConnection} = require('typeorm');
// const auth = require('./client/client.js');

const CourseService = require('./service');
const protoDefinition = protoLoader.loadSync(
    './proto/content-management.proto',
    {
        keepCase: true,
        enums: String,
        defaults: true,
    },
);
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

