const { assert } = require('chai');
const grpc = require('grpc');
const { fake, match } = require('sinon');

const service = require('../service');

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

        after(() => {
            callback.resetHistory();
        });

        it('should call callback with error for invalid email', () => {
            call.request.email = 'invalid';
            service.signUp(call, callback);
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
    });
});
