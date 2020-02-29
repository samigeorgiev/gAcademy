const path = require('path');

const grpc = require('grpc');

const authenticationServices = require('./services/authentication');

const proto = grpc.load(path.join(__dirname, process.env.PROTO_PATH));
const server = new grpc.Server();

console.log(authenticationServices);

server.addService(proto.auth.Authentication.service, authenticationServices);