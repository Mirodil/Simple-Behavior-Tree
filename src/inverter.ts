import BaseState from './baseState';
import { SUCCESS, FAILURE } from './constants';
import InnerNode from './innerNode';

/**
* Inner node. Inverts its child.
* If it receives STATUS_SUCCESS it returns STATUS_FAILURE.
* If it receives STATUS_FAILURE it returns STATUS_SUCCESS.
* If it has no children it returns STATUS_FAILURE. It can only have one child,
* and will replace it if another is added.
* @class Inverter
* @constructor
* @extends Node
*/
export class Inverter<T extends BaseState> extends InnerNode<T> {

    DEFAULT_NODE_NAME = 'Inverter inner node';

    run(state: T): T {
        let i = 1;

        if (this.children.length === 0) {
            return {
                ...state,
                status: FAILURE
            };
        }

        const newState = this.children[0].update(state);

        if (newState.status === FAILURE) {
            newState.status = SUCCESS;
            return newState;
        }

        newState.status = FAILURE;
        return newState;
    }
}

export default Inverter;
