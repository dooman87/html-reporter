'use strict';

const HermioneTestResultAdapter = require('../../../lib/test-adapter/hermione-test-adapter');

describe('hermione test adapter', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => sandbox.restore());

    it('should return suite attempt', () => {
        const testResult = {retriesLeft: 1};
        const config = {retry: 5};

        const hermioneTestAdapter = new HermioneTestResultAdapter(testResult, config);

        assert.equal(hermioneTestAdapter.attempt, 4);
    });

    it('should return test error', () => {
        const testResult = {err: {message: 'some-message', stack: 'some-stack', stateName: 'some-test'}};

        const hermioneTestAdapter = new HermioneTestResultAdapter(testResult);

        assert.deepEqual(JSON.parse(hermioneTestAdapter.error), {
            message: 'some-message',
            stack: 'some-stack',
            stateName: 'some-test'
        });
    });

    it('should return test state', () => {
        const testResult = {title: 'some-test'};

        const hermioneTestAdapter = new HermioneTestResultAdapter(testResult);

        assert.deepEqual(hermioneTestAdapter.state, {name: 'some-test'});
    });

    it('should return reference path', () => {
        const testResult = {err: {refImagePath: 'some-ref-path'}};

        const hermioneTestAdapter = new HermioneTestResultAdapter(testResult);

        assert.deepEqual(hermioneTestAdapter.referencePath, 'some-ref-path');
    });

    it('should return current path', () => {
        const testResult = {err: {currentImagePath: 'some-current-path'}};

        const hermioneTestAdapter = new HermioneTestResultAdapter(testResult);

        assert.deepEqual(hermioneTestAdapter.currentPath, 'some-current-path');
    });

    it('should return image dir', () => {
        const testResult = {id: () => 'some-id'};

        const hermioneTestAdapter = new HermioneTestResultAdapter(testResult);

        assert.deepEqual(hermioneTestAdapter.imageDir, 'some-id');
    });
});