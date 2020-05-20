const { assert } = require('chai');
const grpc = require('grpc');
const { match, spy, stub } = require('sinon');

const bottle = require('../src/util/bottle');
const User = require('../src/models/user');

require('../src/service/api');

describe('service/api.js', () => {
    let repository;
    let logic;
    let api;
    let callback;

    before(() => {
        repository = {
            findOne: stub(),
            save: stub()
        };
        bottle.factory('UserRepository', () => repository);

        logic = {
            signUp: spy(),
            logIn: spy(),
            getUserId: spy()
        };
        bottle.factory('Service.Logic', () => logic);

        api = bottle.container.Service.Api;

        callback = spy();
    });

    after(() => {
        bottle.resetProviders();
    });

    afterEach(() => {
        callback.resetHistory();
        logic.signUp.resetHistory();
        logic.logIn.resetHistory();
        logic.getUserId.resetHistory();
    });

    describe('#signUp', () => {
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
                    matchErrorArg(grpc.status.INVALID_ARGUMENT, 'Invalid email')
                ),
                'should call callback with error for invalid email'
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
                    matchErrorArg(
                        grpc.status.INVALID_ARGUMENT,
                        'Invalid password'
                    )
                ),
                'should call callback with error for invalid password'
            );
        });

        it('should call callback with error for existing user', async () => {
            repository.findOne
                .withArgs({ where: { email: 'valid@email.com' } })
                .resolves(new User());
            await api.signUp(call, callback);
            assert(
                callback.calledWith(
                    matchErrorArg(
                        grpc.status.ALREADY_EXISTS,
                        'User already exists'
                    )
                ),
                'should call callback with error for existing user'
            );
        });

        it('should call signUp method on logic', async () => {
            repository.findOne
                .withArgs({ where: { email: 'valid@email.com' } })
                .resolves(null);
            await api.signUp(call, callback);
            assert(
                logic.signUp.calledWithExactly(call, callback),
                'should call signUp method on logic'
            );
            assert(callback.notCalled, 'should not call callback');
        });
    });

    describe('#logIn', () => {
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
                    matchErrorArg(grpc.status.INVALID_ARGUMENT, 'Invalid email')
                ),
                'should call callback with error for invalid email'
            );
        });

        it('should call logIn method on logic', () => {
            api.logIn(call, callback);
            assert(
                logic.logIn.calledWithExactly(call, callback),
                'should call logIn method on logic'
            );
            assert(callback.notCalled, 'should not call callback');
        });
    });

    describe('#getUserId', () => {
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
                    matchErrorArg(grpc.status.INVALID_ARGUMENT, 'Invalid token')
                ),
                'should call callback with error for invalid token'
            );
        });

        it('should call getUserId method on logic', () => {
            api.getUserId(call, callback);
            assert(
                logic.getUserId.calledWithExactly(call, callback),
                'should call getUserId method on logic'
            );
            assert(callback.notCalled, 'should not call callback');
        });
    });
});

const matchErrorArg = (code, message) =>
    match.instanceOf(Error).and(match.has('message', `${code} ${message}`));
