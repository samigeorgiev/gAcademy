// const { assert } = require('chai');
// const grpc = require('grpc');
// const { createSandbox, fake, match, stub } = require('sinon');
// const typeorm = require('typeorm');

// const service = require('../service');
// const User = require('../model/user');

// describe('Service', () => {
//     const sandbox = createSandbox();

//     afterEach(() => {
//         sandbox.restore();
//     });

//     describe('signUp', () => {
//         it('should return an INVALID_ARGUMENT error', () => {
//             const call = {
//                 request: {
//                     email: 'invalid email',
//                     password: 'password',
//                     firstName: 'firstName',
//                     lastName: 'lastName'
//                 }
//             };
//             const callback = fake();
//             service.signUp(call, callback);
//             assert(
//                 callback.calledWith(
//                     match
//                         .instanceOf(Error)
//                         .and(
//                             match.has(
//                                 'message',
//                                 grpc.status.INVALID_ARGUMENT + ' Invalid email'
//                             )
//                         )
//                 )
//             );
//         });

//         it('repo', () => {
//             const getRepository = stub(typeorm, 'getRepository');
//             const repository = getRepository.returns({
//                 save: () => {}
//             });
//             repository.withArgs(User);
//         });
//     });
// });
