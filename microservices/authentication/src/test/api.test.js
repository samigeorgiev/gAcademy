const { assert } = require('chai');
const grpc = require('grpc');
const { match, spy, stub } = require('sinon');

const bottle = require('../util/bottle');
const User = require('../model/user');

require('../service/api');

describe('service/index.js', () => {
    const repository = {
        findOne: stub(),
        save: stub()
    };
    bottle.factory('UserRepository', () => repository);

    const logic = {
        signUp: spy(),
        logIn: spy(),
        getUserId: spy()
    };
    bottle.factory('Service.Logic', () => logic);

    const api = bottle.container.Service.Api;

    const callback = spy();

    afterEach(() => {
        callback.resetHistory();
        logic.signUp.resetHistory();
        logic.logIn.resetHistory();
        logic.getUserId.resetHistory();
    });

    describe('signUp', () => {
        const call = {
            request: {
                email: 'valid@email.com',
                password: 'validpassword',
                firstName: 'Valid name',
                lastName: 'ValidName'
            }
        };

        it('should call callback with error for invalid email', () => {
            const invalidCall = {
                ...call,
                request: {
                    ...call.request,
                    email: 'invalid'
                }
            };
            api.signUp(invalidCall, callback);
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
            api.signUp(invalidCall, callback);
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
            repository.findOne
                .withArgs({ where: { email: 'valid@email.com' } })
                .resolves(new User());
            await api.signUp(call, callback);
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

        it('should call signUp method on logic', async () => {
            repository.findOne
                .withArgs({ where: { email: 'valid@email.com' } })
                .resolves(null);
            await api.signUp(call, callback);
            assert(logic.signUp.calledWithExactly(call, callback));
            assert(callback.notCalled);
        });
    });

    describe('logIn', () => {
        const call = {
            request: {
                email: 'valid@email.com',
                password: 'validpassword'
            }
        };

        it('should call callback with error for invalid email', () => {
            const invalidCall = {
                ...call,
                request: {
                    ...call.request,
                    email: 'invalid'
                }
            };
            api.logIn(invalidCall, callback);
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

        it('should call logIn method on logic', () => {
            api.logIn(call, callback);
            assert(logic.logIn.calledWithExactly(call, callback));
            assert(callback.notCalled);
        });
    });

    describe('getUserId', () => {
        const call = {
            request: {
                token: 'abcd'
            }
        };

        it('should call callback with error for invalid token', () => {
            const invalidCall = {
                ...call,
                request: {
                    ...call.request,
                    token: null
                }
            };
            api.getUserId(invalidCall, callback);
            assert(
                callback.calledWith(
                    match
                        .instanceOf(Error)
                        .and(
                            match.has(
                                'message',
                                grpc.status.INVALID_ARGUMENT + ' Invalid token'
                            )
                        )
                )
            );
        });

        it('should call getUserId method on logic', () => {
            api.getUserId(call, callback);
            assert(logic.getUserId.calledWithExactly(call, callback));
            assert(callback.notCalled);
        });
    });
});
