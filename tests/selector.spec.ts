import { expect, it, describe } from '@jest/globals';
import { FAILURE, READY, SUCCESS } from '../src/constants';
import Failure from '../src/failure';
import Success from '../src/success';
import Selector from './../src/selector';

describe('Selector', () => {
    it('expect to return SUCCESS', () => {
        const node = new Selector({});
        node.addChild(new Success({}));
        const newState = node.update({ status: READY });
        expect(newState.status).toBe(SUCCESS);
    });

    it('expect to return FAILURE when there is no SUCCESS', () => {
        const node = new Selector({});
        node.addChild(new Failure({}));
        node.addChild(new Failure({}));
        const newState = node.update({ status: READY });
        expect(newState.status).toBe(FAILURE);
    });
});
