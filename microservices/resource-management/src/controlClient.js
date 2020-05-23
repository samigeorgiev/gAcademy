const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

class Client {
    constructor(url) {
        return;
        const packageDefinition = protoLoader.loadSync(
            './src/proto/resource-management-control.proto',
            {
                keepCase: true,
                enums: String,
                defaults: true
            }
        );
        const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
        this.client = new protoDescriptor.ResourceManagementControl(
            url,
            grpc.credentials.createInsecure()
        );
    }

    getResourceId(request, callback) {
        return callback(null, { id: request.token });
        this.client.getResourceId(request, callback);
    }
}

module.exports = Client;
