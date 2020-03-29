const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const { createConnection } = require('typeorm');

const service = require('./service');
const logger = require('./util/logger');

const packageDefinition = protoLoader.loadSync('./proto/authentication.proto', {
    keepCase: true,
    enums: String,
    defaults: true
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(protoDescriptor.Authentication.service, service);

const port = process.env.PORT;
if (process.env.NODE_ENV === 'production') {
    // TODO create tls
} else {
    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
}

createConnection()
    .then(() => {
        server.start();
        logger.info(`Running in ${process.env.NODE_ENV} at port ${port}`);
    })
    .catch(error => logger.error(error.stack));
