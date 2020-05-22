const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const { createConnection } = require('typeorm');

const LectureService = require('./service');

const packageDefinition = protoLoader.loadSync(
    '../../proto/resource-management-control.proto',
    {
        keepCase: true,
        enums: String,
        defaults: true,
    }
);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(
    protoDescriptor.resource_management_control.Lecture.service,
    LectureService
);

const port = process.env.PORT;
if (process.env.NODE_ENV === 'production') {
    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
} else {
    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
}

createConnection()
    .then(() => {
        server.start();
    })
    .catch((error) => console.error(error.stack));
console.log('hi');
