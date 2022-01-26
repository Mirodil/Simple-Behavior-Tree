import BaseState from "./baseState";
import { JSONStructure } from "./jsonStructure";

export interface BaseNodeParameters<T extends BaseState> extends Record<string, any> {
    name?: string,
    children?: BaseNode<T>[]
}

export type BaseNodeCtorType<T extends BaseState> = { new(params: BaseNodeParameters<T>): BaseNode<T> };

/**
 * Default node name.
 * @default "Untitled outer node"
 */
const DEFAULT_NODE_NAME = 'Untitled outer node';

/**
 * Template for all responsive nodes. A Node performs some process
 * (usually an action or a condition check)
 * then returns a STATUS to its caller. This STATUS dictates the entire
 * tree traversal.
 * All nodes are based on the Node.
 *
 * @class Node
 */
export abstract class BaseNode<T extends BaseState> {

    DEFAULT_NODE_NAME = 'Untitled outer node';

    /**
     * Optional name for the node. This is not used internally, but is useful
     * for debugging. If it has no value given in params, it takes it
     * from the DEFAULT_NODE_NAME.
     *
     * @type {string}
     */
    name: string;

    /**
     * A node may have multiple parents, but may not create cyclic graphs.
     *
     * @type {Array<BaseNode>}
     */
    parents: BaseNode<T>[] = [];

    /**
     * The child nodes of this node.
     */
    children: BaseNode<T>[] = [];

    /**
     * Creates an instance of Node.
     * @param [name] {string} Name for the node
     */
    constructor({ name = DEFAULT_NODE_NAME, children = [] }: BaseNodeParameters<T>) {
        this.name = name;
        children.forEach(child => this.addChild(child));
    }

    /**
     * Adds a parent to this node. Do not call directly. Does not check for cycling.
     * @param candidate 
     * @return {boolean}
     */
    private addParent(candidate: BaseNode<T>) {
        this.parents.push(candidate);
    };

    /**
     * Removes a parent from this node. Do not call directly.
     * Does not check for cycling.
     * @param candidate 
     * @returns {boolean}
     */
    private removeParent(candidate: BaseNode<T>) {
        const index = this.parents.indexOf(candidate);
        if (index !== -1) {
            this.parents.splice(index, 1);
        }
    };

    /**
     * Customizable stub for node behaviors.
     * Override this method to create your own custom behaviors.
     */
    abstract run(state: T): T;

    /**
     * Runs node functionality. Returns status. Do not override this function;
     * use _run() to define user code.
     * @method update
     * @public
     */
    update(state: T) {
        // TODO: fire event
        const newState = this.run(state);
        // TODO: fire event
        return newState;
    };

    /**
     * Recursive search for a particular node.
     * A node counts as its own ancestor.
     * @param candidate BaseNode Node to find
     * @return boolean
     */
    hasAncestor(candidate: BaseNode<T>): boolean {
        if (this === candidate) {
            return true;
        }
        return this.parents.some(parent => parent.hasAncestor(candidate));
    }

    /**
    * Passes a child node as candidate for inclusion.
    * Checks for validity; a child cannot be its own parent or ancestor.
    * Candidate is only appended if it is legal.
    * @method addChild
    * @param candidate BaseNode Node to add as child
    * @return boolean
    * @public
    */
    addChild(candidate: BaseNode<T>) {

        // Sanitize inputs: avoid null or duplicate entries
        if (candidate == null || this.children.includes(candidate)) {
            return false;
        }

        // Cycling check
        if (this.hasAncestor(candidate)) {
            return false;
        }

        // Accept legal candidates
        this.children.push(candidate);
        candidate.addParent(this);

        // Signal legal success
        return true;
    }

    /**
    * Removes a child of this node, if it exists.
    * @method removeChild
    * @param candidate {Node} Node to remove
    * @return boolean
    * @public
    */
    removeChild(candidate: BaseNode<T>) {
        // Deregister childhood
        const index = this.children.indexOf(candidate);
        if (index !== -1) {
            this.children.splice(index, 1);

            // Deregister parenthood, ignoring returns because it's never a parent
            candidate.removeParent(this);

            return true;
        }
        return false;
    }

    /**
    * Returns whether a particular node is beneath this node.
    * @method hasDescendant
    * @param candidate {Node} Node to find
    * @return boolean
    * @public
    */
    hasDescendant(candidate: BaseNode<T>): boolean {
        const has = this.children.includes(candidate);
        if (!has) {
            return this.children.some(node => node.hasDescendant(candidate));
        }
        return has;
    }

    /**
     * Convert BehaviorTree to JSON structure
     * @returns JSONStructure
     */
    public toJSON(): JSONStructure {
        const json: JSONStructure = {
            id: this.constructor.name,
            name: this.name
        }
        if (this.children && this.children.length > 0) {
            json.children = this.children.map(child => child.toJSON());
        }
        return json;
    }
}

export default BaseNode;
