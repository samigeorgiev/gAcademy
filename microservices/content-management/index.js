const path = require('path');

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// const logger = require('./util/logger');
const sequelize = require('./util/db');

const browseCourseService = require('./services/getCourse');

require('./models/user');
require('./models/course');
require('./models/category');
require('./models/student');
require('./models/teacher');

const protoDefinition =
    protoLoader.loadSync(path.join(__dirname, process.env.PROTO_PATH), {
        keepCase: true,
        enums: String,
        defaults: true,
    });
const protoDescriptor = grpc.loadPackageDefinition(protoDefinition);

const server = new grpc.Server();

server.addService(
    protoDescriptor.content_management.GetCourse.service,
    browseCourseService,
);

const port = process.env.PORT || 8080;
if (process.env.NODE_ENV === 'production') {
    // TODO create tls
} else {
    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
    // logger.info(`Running server in ${process.env.NODE_ENV} at port ${port}`);
}

sequelize.sync({force: true})
    .then(_ => server.start())
    .catch(error => console.error(error.message));
