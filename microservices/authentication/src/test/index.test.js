const { assert } = require('chai');
const grpc = require('grpc');
const { fake, match, stub, createStubInstance } = require('sinon');
const typeorm = require('typeorm');

const service = require('../service');
const User = require('../model/user');

describe('service/index.js', () => {
    describe('signUp', () => {
        const call = {
            request: {
                email: 'valid@email.com',
                password: 'validpassword',
                firstName: 'Valid name',
                lastName: 'ValidName'
            }
        };

        const callback = fake();

        afterEach(() => {
            callback.resetHistory();
        });

        after(() => {
            getRepository.restore();
        });

        it('should call callback with error for invalid email', () => {
            const invalidCall = {
                ...call,
                request: {
                    ...call.request,
                    email: 'invalid'
                }
            };
            service.signUp(invalidCall, callback);
            assert(
                callback.calledWith(
                    match
                        .instanceOf(Error)
                        .and(
                            match.has(
                                'message',
                                grpc.status.INVALID_ARGUMENT + ' Invalid email'
                            )
                        )
                )
            );
        });

        it('should call callback with error for invalid password', () => {
            const invalidCall = {
                ...call,
                request: {
                    ...call.request,
                    password: 'invalid'
                }
            };
            service.signUp(invalidCall, callback);
            assert(
                callback.calledWith(
                    match
                        .instanceOf(Error)
                        .and(
                            match.has(
                                'message',
                                grpc.status.INVALID_ARGUMENT +
                                    ' Invalid password'
                            )
                        )
                )
            );
        });

        it('should call callback with error for existing user', async () => {
            const repository = createStubInstance(typeorm.Repository);
            repository.findOne.returns(
                new Promise((resolve, reject) => resolve({ email }))
            );
            stub(typeorm, 'getRepository').returns(repository);
            await service.signUp(call, callback);
            assert(
                callback.calledWith(
                    match
                        .instanceOf(Error)
                        .and(
                            match.has(
                                'message',
                                grpc.status.ALREADY_EXISTS +
                                    ' User already exists'
                            )
                        )
                )
            );
        });
    });
});
