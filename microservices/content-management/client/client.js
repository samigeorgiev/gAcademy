const AUTH_PATH = __dirname + '/../../../proto/authentication.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    AUTH_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
const auth = grpc.loadPackageDefinition(packageDefinition).Authentication;
console.log(auth);
// const client = new auth.Authentication(
//     'localhost:9000',
//     grpc.credentials.createInsecure(),
// );
// function runGetUserId(callback) {
//     function returnCallback(err, res) {
//         console.log(err, res);
//     };
//     client.getUserId(
//         {token: tokenFromMetadata},
//         returnCallback,
//     );
// };
