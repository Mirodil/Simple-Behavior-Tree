import { expect, it, describe } from '@jest/globals';
import { FAILURE, SUCCESS } from '../src/constants';
import Failure from './../src/failure';

describe('Failure', () => {
    it('expect to run successful', () => {
        const node = new Failure({ name: 'Failure test' });
        const newState = node.update({ status: SUCCESS });
        expect(newState.status).toBe(FAILURE);
    });
});