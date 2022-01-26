import { expect, it, describe } from '@jest/globals';
import { FAILURE, READY } from '../src/index';
import Failure from './../src/failure';

describe('Failure', () => {
    it('expect to run successful', () => {
        const node = new Failure({ name: 'Failure test' });
        const newState = node.update({ status: READY });
        expect(newState.status).toBe(FAILURE);
    });
});