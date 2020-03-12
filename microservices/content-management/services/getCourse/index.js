
// const grpc = require('grpc');

// const course = require('../../models/course');

// exports.browseCourse = async (call, callback) => {
//     const {name} = call.request;

//     let course;
//     try {
//         course = await Course.findOne({
//             attributes: ['id', 'name'],
//             where: {name},
//         });
//     } catch (error) {
//         // logger.error(`This course is already browsed: ${error.message}`);
//         return callback(grpc.status.ALREADY_EXISTS, null);
//     }
// };
