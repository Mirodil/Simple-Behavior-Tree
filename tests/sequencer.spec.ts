import { expect, it, describe } from '@jest/globals';
import { FAILURE, READY, SUCCESS } from '../src/constants';
import Failure from '../src/failure';
import Success from '../src/success';
import Sequencer from '../src/sequencer';

describe('Sequencer', () => {
    it('expect to return SUCCESS', () => {
        const node = new Sequencer({});
        node.addChild(new Success({}));
        node.addChild(new Success({}));
        const newState = node.update({ status: READY });
        expect(newState.status).toBe(SUCCESS);
    });

    it('expect to return FAILURE when one of the nodes returns FAILURE', () => {
        const node = new Sequencer({});
        node.addChild(new Success({}));
        node.addChild(new Failure({}));
        const newState = node.update({ status: READY });
        expect(newState.status).toBe(FAILURE);
    });
});
