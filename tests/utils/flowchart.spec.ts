import { expect, it, describe } from '@jest/globals';
import BehaviorTree from '../../src/behaviorTree';
import Sequencer from '../../src/sequencer';
import Selector from '../../src/selector';
import Failure from '../../src/failure';
import Success from '../../src/success';
import flowchart from '../../src/utils/flowchart';

describe('flowchart', () => {
    it('expect to return empty string', () => {
        const root = new BehaviorTree();
        expect(flowchart(root)).toEqual('graph TD;');
    });

    it('expect to return root element only', () => {
        const root = new BehaviorTree();
        root.addChild(new Sequencer({ name: 'This is root' }));
        expect(flowchart(root)).toEqual('graph TD;\nSequencer(Sequencer:This is root)');
    });

    it('expect to return full graph', () => {
        const root = new BehaviorTree(
            new Selector({
                name: 'Root',
                children: [
                    new Sequencer({
                        name: 'Failed nodes',
                        children: [
                            new Failure({ name: 'Failure First' }),
                            new Failure({ name: 'Failure Second' })
                        ]
                    }),
                    new Sequencer({
                        name: 'Success nodes',
                        children: [
                            new Success({ name: 'Success First' }),
                            new Success({ name: 'Success Second' })
                        ]
                    })
                ]
            })
        );
        const expectedText = ['graph TD;',
            'Selector(Selector:Root) --> Sequencer(Sequencer:Failed nodes)',
            'Selector(Selector:Root) --> Sequencer1(Sequencer:Success nodes)',
            'Sequencer(Sequencer:Failed nodes) --> Failure(Failure:Failure First)',
            'Sequencer(Sequencer:Failed nodes) --> Failure1(Failure:Failure Second)',
            'Sequencer1(Sequencer:Success nodes) --> Success(Success:Success First)',
            'Sequencer1(Sequencer:Success nodes) --> Success1(Success:Success Second)'].join('\n');
        expect(flowchart(root)).toEqual(expectedText);
    });
});