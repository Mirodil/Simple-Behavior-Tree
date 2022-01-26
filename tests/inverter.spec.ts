import { expect, it, describe } from '@jest/globals';
import { FAILURE, SUCCESS, READY } from '../src/constants';
import Failure from '../src/failure';
import Success from '../src/success';
import Inverter from './../src/inverter';

describe('Invert', () => {
    it('expect to invert FAILURE to SUCCESS', () => {
        const root = new Inverter({});
        root.addChild(new Failure({}))
        const newState = root.update({ status: READY });
        expect(newState.status).toBe(SUCCESS);
    });

    it('expect to invert SUCCESS to FAILURE', () => {
        const root = new Inverter({});
        root.addChild(new Success({}))
        const newState = root.update({ status: READY });
        expect(newState.status).toBe(FAILURE);
    });

    it('expect to replace old node with new node', () => {
        const node = new Inverter({});
        const oldNode = new Failure({});
        node.addChild(oldNode);
        const newNode = new Success({});
        node.addChild(newNode);
        expect(node.children.length).toBe(1);
        expect(node.children[0]).toBe(newNode);
    });

    it('expect to return FAILURE when there is child', () => {
        const node = new Inverter({});
        const newState = node.update({ status: READY });
        expect(newState.status).toBe(FAILURE);
    });
});