const path = require('path');

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const logger = require('./util/logger');
const sequelize = require('./util/db');

const authenticationService = require('./services/authentication');

const packageDefinition =
    protoLoader.loadSync(path.join(__dirname, process.env.PROTO_PATH), {
        keepCase: true,
        enums: String,
        defaults: true,
    });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(
    protoDescriptor.auth.Authentication.service,
    authenticationService,
);

const port = process.env.PORT || 8000;
if (process.env.NODE_ENV === 'production') {
    // TODO create tls
} else {
    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
    logger.info(`Running server in ${process.env.NODE_ENV} at port ${port}`);
}

sequelize.sync()
    .then(() => server.start())
    .catch(error => logger.error(error));
