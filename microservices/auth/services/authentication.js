const grpc = require('grpc');

exports.registerStudent = (call, callback) => {
    
    callback(grpc.status.OK, { jwt: 'tmp', id: '1' });
};

exports.registerTeacher = (call, callback) => {
    
    callback(grpc.status.OK, { jwt: 'tmp', id: '1' });
};