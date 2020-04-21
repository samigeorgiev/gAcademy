const { assert } = require('chai');

const Client = require('./client');

describe('service', () => {
    let client;

    const createdUser = {
        id: 1,
        email: 'valid@email.com',
        password: 'validpassword',
        firstName: 'Valid name',
        lastName: 'Valid name',
        tokens: []
    };

    before(() => {
        client = new Client('localhost:9000');
    });

    describe('#signUp', () => {
        it('should create user', done => {
            const request = {
                email: createdUser.email,
                password: createdUser.password,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName
            };
            client.signUp(request, (error, response) => {
                assert.isNotOk(error);
                assert.hasAllKeys(response, ['token', 'expiresIn']);
                createdUser.tokens.push(response.token);
                done();
            });
        });
    });

    describe('#logIn', () => {
        const request = {
            email: createdUser.email,
            password: createdUser.password
        };

        it('should log in and get token', done => {
            client.logIn(request, (error, response) => {
                assert.isNotOk(error);
                assert.hasAllKeys(response, ['token', 'expiresIn']);
                createdUser.tokens.push(response.token);
                done();
            });
        });
    });

    describe('#getUserId', () => {
        it('should get id 1', done => {
            client.getUserId(
                { token: createdUser.tokens[0] },
                (error, response) => {
                    assert.isNotOk(error);
                    assert.hasAllKeys(response, ['userId']);
                    assert.equal(response.userId, 1);
                    client.getUserId(
                        { token: createdUser.tokens[1] },
                        (error, response) => {
                            assert.equal(response.userId, 1);
                            done();
                        }
                    );
                }
            );
        });
    });
});
