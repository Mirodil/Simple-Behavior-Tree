import { expect, it, describe } from '@jest/globals';
import Success from "../src/success";
import BaseState from "../src/baseState";
import BehaviorTree from '../src/behaviorTree';
import { ERROR, FAILURE, Failure, Inverter, Selector, Sequencer, SUCCESS } from "../src";

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
        const node = new Success<BaseState>({ name: 'test node' });
        const tree = new BehaviorTree<BaseState>();
        expect(tree.hasDescendant(node)).toBeFalsy();
    });

    it('expect hasDescendant return true when looking root node', () => {
        const node = new Success<BaseState>({ name: 'test node' });
        const tree = new BehaviorTree<BaseState>(node);
        expect(tree.hasDescendant(node)).toBeTruthy();
    });

    it('expect to return ERROR status without root node', () => {
        const state = { status: SUCCESS };
        const tree = new BehaviorTree<BaseState>();
        const newState = tree.update(state);
        expect(newState.status).toBe(ERROR);
    });

    it('expect to return JSON copy of the tree', () => {
        const tree = new BehaviorTree(new Selector({
            name: 'Test Selector',
            children: [
                new Sequencer({
                    name: 'Test Sequencer',
                    children: [
                        new Success({ name: 'Success test1' }),
                        new Success({ name: 'Success test2' })
                    ]
                }),
                new Failure({ name: 'Test Failure' })
            ]
        }));
        const jsonObj = tree.toJSON();
        expect(jsonObj).toEqual({
            id: 'Selector',
            name: 'Test Selector',
            children: [
                {
                    id: 'Sequencer',
                    name: 'Test Sequencer',
                    children: [
                        {
                            id: 'Success',
                            name: 'Success test1',
                        },
                        {
                            id: 'Success',
                            name: 'Success test2',
                        }
                    ]
                },
                {
                    id: 'Failure',
                    name: 'Test Failure',
                }
            ],
        });
    });

    it('expect to return tree copy of the JSON', () => {
        const json = {
            id: 'Selector',
            name: 'Test Selector',
            children: [
                {
                    id: 'Sequencer',
                    name: 'Test Sequencer',
                    children: [
                        {
                            id: 'Success',
                            name: 'Success test1',
                        },
                        {
                            id: 'Success',
                            name: 'Success test2',
                        }
                    ]
                },
                {
                    id: 'Failure',
                    name: 'Test Failure',
                }
            ],
        };
        const treeFromJson = BehaviorTree.fromJSON(json);
        expect(treeFromJson.root).toBeInstanceOf(Selector);
        expect(treeFromJson.root?.children[0]).toBeInstanceOf(Sequencer);
        expect(treeFromJson.root?.children[0].children[0]).toBeInstanceOf(Success);
        expect(treeFromJson.root?.children[0].children[1]).toBeInstanceOf(Success);
        expect(treeFromJson.root?.children[1]).toBeInstanceOf(Failure);
        expect(treeFromJson.toJSON()).toEqual(json);
    });

    it('expect to call update function', () => {
        const tree = new BehaviorTree(new Success({}));
        const state = tree.update({ status: FAILURE });
        expect(state.status).toBe(SUCCESS);
    });

    it('expect to throw error when trying to define existing node', () => {
        expect(() => {
            BehaviorTree.define(Selector);
        }).toThrowError('The CustomNodeRegistry already contains an entry with the same constructor: Selector');
    });

    it('expect to throw error when trying to use unregistered node', () => {
        const json = {
            id: 'SuperDuperSelector',
            name: 'Test Selector',
        };

        expect(() => {
            BehaviorTree.fromJSON(json);
        }).toThrowError('SuperDuperSelector node is not registered in the CustomNodeRegistry')
    });
});