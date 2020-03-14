const path = require('path');

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const {createConnection} = require('typeorm');

const authenticationService = require('./services/authentication');
const logger = require('./util/logger');

const packageDefinition =
    protoLoader.loadSync(path.join(__dirname, process.env.PROTO_PATH), {
        keepCase: true,
        enums: String,
        defaults: true,
    });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(
    protoDescriptor.authentication.Authentication.service,
    authenticationService,
);

const port = process.env.PORT || 8000;
if (process.env.NODE_ENV === 'production') {
    // TODO create tls
} else {
    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
}

createConnection()
    .then(() => {
        server.start();
        logger.info(`Running in ${process.env.NODE_ENV} at port ${port}`);
    }).catch(error => logger.error(error.stack));
