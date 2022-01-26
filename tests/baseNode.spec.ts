import { expect, it, describe } from '@jest/globals';
import BaseState from '../src/baseState';
import BaseNode from './../src/baseNode';

class TestNode extends BaseNode<BaseState>{
    run(state: BaseState): BaseState {
        return state;
    }
}

describe('BaseNode', () => {
    it('expect to return false to cycling', () => {
        const parent = new TestNode({ name: 'Parent node' });
        const child = new TestNode({ name: 'Child node' });
        expect(parent.addChild(child)).toBeTruthy();
        expect(child.addChild(parent)).toBeFalsy();
    });

    it('expect to return false to add node to itself', () => {
        const child = new TestNode({ name: 'Child node' });
        expect(child.addChild(child)).toBeFalsy();
    });

    it('expect to return false to add the same child twice', () => {
        const parent = new TestNode({ name: 'Parent node' });
        const child = new TestNode({ name: 'Child node' });
        expect(parent.addChild(child)).toBeTruthy();
        expect(parent.addChild(child)).toBeFalsy();
    });

    it('expect to return false to remove not existing child', () => {
        const parent = new TestNode({ name: 'Parent node' });
        const child = new TestNode({ name: 'Child node' });
        expect(parent.removeChild(child)).toBeFalsy();
    });

    it('expect to return false when node is not beneath this node', () => {
        const parent = new TestNode({ name: 'Parent node' });
        const child = new TestNode({ name: 'Child node' });
        expect(parent.hasDescendant(child)).toBeFalsy();
    });

    it('expect to return false when node is beneath this node', () => {
        const parent = new TestNode({ name: 'Parent node' });
        const child = new TestNode({ name: 'Child node' });
        parent.addChild(child);
        expect(parent.hasDescendant(child)).toBeTruthy();
    });

    it('expect to return false when node is not beneath this node', () => {
        const parent = new TestNode({ name: 'Parent node' });
        const child = new TestNode({ name: 'Child node' });
        const grandchild = new TestNode({ name: 'Grandchild node' });
        parent.addChild(child)
        child.addChild(grandchild);
        expect(parent.hasDescendant(grandchild)).toBeTruthy();
    });
});