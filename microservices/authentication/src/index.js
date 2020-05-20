const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const { createConnection } = require('typeorm');

const bottle = require('./util/bottle');
const logger = require('./util/logger');

// Loading all services
require('./service/api');
require('./service/logic');
require('./repositories/userRepository');

const main = async () => {
    try {
        await createConnection();
    } catch (error) {
        return logger.error(error.stack);
    }

    const packageDefinition = protoLoader.loadSync(
        './src/proto/authentication.proto',
        {
            keepCase: true,
            enums: String,
            defaults: true
        }
    );
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

    const server = new grpc.Server();
    server.addService(
        protoDescriptor.Authentication.service,
        bottle.container.Service.Api
    );

    const port = process.env.PORT;
    if (process.env.NODE_ENV === 'production') {
        // TODO create tls
        server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
    } else {
        server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
    }

    server.start();
    logger.info(`Running in ${process.env.NODE_ENV} at port ${port}`);
};

main();
