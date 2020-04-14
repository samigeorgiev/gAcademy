/* eslint-disable */
const { assert } = require('chai');
const { match, spy, stub } = require('sinon');

const bottle = require('../util/bottle');

require('../service/logic');

describe('service/logic.js', () => {
    let repository;
    let logic;
    let callback;

    before(() => {
        repository = {
            findOne: stub(),
            save: stub()
        };
        bottle.factory('UserRepository', () => repository);

        logic = bottle.container.Service.Logic;

        callback = spy();
    });

    after(() => {
        bottle.resetProviders();
    });

    afterEach(() => {
        callback.resetHistory();
    });

    describe('signUp', () => {
        it('tmp', () => {});
    });
});
