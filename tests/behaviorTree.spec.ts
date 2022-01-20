import { expect, it, describe } from "@jest/globals";
import Success from "../src/success";
import BaseState from "../src/baseState";
import BehaviorTree from '../src/behaviorTree';

describe('BehaviorTree', () => {
    it('expect to initialize BehaviorTree', () => {
        const tree = new BehaviorTree<BaseState>();
        expect(tree).toBeInstanceOf(BehaviorTree);
    });

    it('expect hasAncestor return false', () => {
        const tree = new BehaviorTree<BaseState>();
        expect(tree.hasAncestor()).toBeFalsy();
    });

    it('expect hasDescendant return false without no root node', () => {
        const node = new Success<BaseState>('test node');
        const tree = new BehaviorTree<BaseState>();
        expect(tree.hasDescendant(node)).toBeFalsy();
    });

    it('expect hasDescendant return true when looking root node', () => {
        const node = new Success<BaseState>('test node');
        const tree = new BehaviorTree<BaseState>(node);
        expect(tree.hasDescendant(node)).toBeTruthy();
    });
});