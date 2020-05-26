const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const { createConnection } = require("typeorm");

const LectureService = require("./service");

const protoDefinition = protoLoader.loadSync(
    "./src/proto/resource-management-control.proto",
    {
        keepCase: true,
        enums: String,
        defaults: true,
    }
);
const protoDescriptor = grpc.loadPackageDefinition(protoDefinition);

const server = new grpc.Server();
server.addService(
    protoDescriptor.resource_management_control.Lecture.service,
    LectureService
);

const port = process.env.PORT || 9002;
server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());

createConnection()
    .then(() => {
        server.start();
    })
    .catch((error) => console.error(error.stack));
