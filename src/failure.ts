import BaseNode from './baseNode';
import BaseState from './baseState';
import { FAILURE } from './constants';

/**
* Very simple outer node that always returns STATUS_FAILURE.
* This can be useful for controlling sophisticated behaviors.
* For example, if you use a Sequencer to perform a series of tasks,
* but would like the Sequencer to fail for reasons of flow control,
* you can add a Failure node to the end.
* @class Failure
* @extends BaseNode
*/
export class Failure<T extends BaseState> extends BaseNode<T> {
    DEFAULT_NODE_NAME = 'Failure outer node';

    run(state: T): T {
        const newState = {
            ...state,
            status: FAILURE
        };
        return newState;
    }
}

export default Failure;