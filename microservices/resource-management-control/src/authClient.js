const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

class Client {
    constructor(url) {
        const packageDefinition = protoLoader.loadSync(
            './src/proto/authentication.proto',
            {
                keepCase: true,
                enums: String,
                defaults: true
            }
        );
        const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
        this.client = new protoDescriptor.Authentication(
            url,
            grpc.credentials.createInsecure()
        );
    }

    signUp(request, callback) {
        this.client.signUp(request, callback);
    }

    logIn(request, callback) {
        this.client.logIn(request, callback);
    }

    getUserId(request, callback) {
        this.client.getUserId(request, callback);
    }
}

module.exports = Client;
