import InnerNode from './innerNode';
import { SUCCESS, FAILURE } from './constants';
import BaseNode, { BaseNodeParameters } from './baseNode';
import BaseState from './baseState';

/**
* Inner node. Tries to execute a sequence. Steps through children one by one.
* If it reaches the end, it returns STATUS_SUCCESS.
* If it receives STATUS_FAILURE it returns STATUS_FAILURE.
* @class Sequencer
* @constructor
* @extends InnerNode
*/
export class Sequencer<T extends BaseState> extends BaseNode<T> {
    DEFAULT_NODE_NAME = 'Sequencer inner node';

    constructor(params: BaseNodeParameters<T>) {
        super(params);
    }

    run(state: T): T {

        let output = { ...state };
        for (const child of this.children) {
            // Run child
            output = child.update(output);

            if (output.status === FAILURE) {
                return output;
            }
        }

        // No FAILURE results? Then this pass finishes as a success
        return {
            ...output,
            status: SUCCESS
        }
    }
}

export default Sequencer;
