import BaseNode from './baseNode';
import BaseState from './baseState';
import { SUCCESS } from './constants';

/**
* Very simple outer node that always returns STATUS_SUCCESS.
* This can be useful for controlling sophisticated behaviors.
* For example, if you use a Selector to perform one of a series of tasks,
* none of which are guaranteed to return success, but you want the Selector
* to always succeed, you can add a Success node to the end.
*/
export class Success<T extends BaseState> extends BaseNode<T> {

    DEFAULT_NODE_NAME = 'Success outer node';

    constructor(name?: string) {
        super(name);
    }

    run(state: T): T {
        return {
            ...state,
            status: SUCCESS
        }
    }

    public static fromJSON(): void {
        
    }
}


export default Success;
