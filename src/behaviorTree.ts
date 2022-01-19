import { STATUS, ERROR } from './constants';
import BaseNode from './baseNode';

export class BehaviorTree<T> {
    /**
     * The root node of the AI tree, where all decision-making begins.
     * @property root
     * @type {BaseNode}
     * @private
     */
    private _root: BaseNode;

    /**
     * Master list of all unique child nodes.
     * @property uniqueChildren
     * @type {array}
     * @public
     * @memberOf BehaviorTree
     */
    public uniqueChildren: Array<BaseNode> = [];

    constructor() { }

    public get root() {
        return this._root;
    }

    public set root(candidate: BaseNode) {
        if (candidate) {
            this._root = candidate;
            // this._root.addParent(this)
            // this.updateCensus();
        }
    }

    /**
    * Adds a child to the node tree. Because this base can only have one child,
    * the root, this just calls this.setRoot().
    * @method addChild
    * @param candidate {BaseNode}
    * @return {BaseNode}
    */
    public addChild(candidate: BaseNode) {
        this.root = candidate;
        return candidate;
    }

    /**
    * Whether this node has a specific ancestor. Because this cannot have ancestors
    * by definition, always returns false.
    * @method hasAncestor
    * @return {boolean}
    */
    public hasAncestor() {
        return false;
    }

    /**
    * Whether this node has a specific descendant.
    * @method hasDescendant
    * @param candidate {BaseNode}
    * @return {boolean}
    */
    public hasDescendant(candidate: BaseNode): boolean {
        return this.uniqueChildren.includes(candidate);
    }

    /**
     * Updates the Ai tree and makes decisions. Call this once per frame.
     *
     * @public
     * @return {number} A number, a constant referring to the status of the tree.
     * @memberOf BehaviorTree
     */
    update(state: T) {
        let status: STATUS = ERROR;

        // Reset the tree
        this.uniqueChildren.forEach(child => child.reset());

        // Run the tree
        if (this.root && this.root.update !== undefined) {
            status = this.root.update();
        }

        return status;
    }

    /**
    * Updates the census, a list of all unique child nodes.
    * @method updateCensus
    * @return {boolean}
    */
    updateCensus() {
        let descendants = this.root.getDescendants();

        this.uniqueChildren = [this.root];
        for (let i = 0; i < descendants.length; i++) {

            // If a descendant is not yet represented, add it.
            if (!this.uniqueChildren.includes(descendants[i])) {
                this.uniqueChildren.push(descendants[i]);
            }
        }

        // Return true, which is only returned from the very base of the tree.
        return true;
    }
}

export default BehaviorTree;
