import BaseNode from './baseNode';
import BaseState from './baseState';
import { SUCCESS, FAILURE } from './constants';
/**
* Inner node. Tries to find a successful node. Steps through children one by one.
* If it receives STATUS_SUCCESS, it returns STATUS_SUCCESS.
* If it reaches the end, it returns STATUS_FAILURE.
*/
export class Selector<T extends BaseState> extends BaseNode<T> {
    DEFAULT_NODE_NAME = 'Selector inner node';

    constructor(name?: string) {
        super(name);
    }

    /**
    * Node functionality, called once per call
    * @method _run
    * @private
    */
    run(state: T): T {

        for (const child of this.children) {
            // Run child
            const output = child.update(state);
            if (output.status === SUCCESS) {
                return output;
            }
        }

        // No SUCCESS results? Then this pass finishes as a failure.
        return {
            ...state,
            status: FAILURE
        }
    }
}

export default Selector;
