const path = require('path');

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const authenticationService = require('./services/authenticationService');
const authorizationService = require('./services/authorizationService');

const protoDefinition =
    protoLoader.loadSync(path.join(__dirname, process.env.PROTO_PATH));
const protoDescriptor = grpc.loadPackageDefinition(protoDefinition);

const server = new grpc.Server();

server.addService(protoDescriptor.auth.Authentication.service, authenticationService);
server.addService(protoDescriptor.auth.Authorization.service, authorizationService);

server.bind('0.0.0.0:8000', grpc.ServerCredentials.createInsecure());
server.start();