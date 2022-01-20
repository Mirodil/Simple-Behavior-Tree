import BaseNode from './baseNode';
import BaseState from './baseState';

/**
 * Base node for using as connector node and based class for extending logic of the tree
 */
export abstract class InnerNode<T extends BaseState> extends BaseNode<T> {

    /**
    * Default node name.
    * @default "Untitled outer node"
    * @type {string}
    * @public
    * @final
    */
    DEFAULT_NODE_NAME = 'Untitled inner node';

    constructor(name?: string) {
        super(name);
    }

    /**
     * Passes a child node as candidate for inclusion.
     * Checks for validity; a child cannot be its own parent or ancestor.
     * Candidate is only appended if it is legal.
     * Inverter nodes can only have one child, and replace old children
     * @param candidate BaseNode Node to add as child
     * @returns boolean
     */
    addChild(candidate: BaseNode<T>): boolean {
        const success = super.addChild(candidate);

        if (success) {
            while (this.children.length > 1) {
                this.removeChild(this.children[0]);
            }
        }

        return success;
    }

}

export default InnerNode;