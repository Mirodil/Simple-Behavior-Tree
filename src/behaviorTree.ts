import { STATUS, ERROR } from './constants';
import BaseNode, { BaseNodeCtorType } from './baseNode';
import { BaseState } from './baseState';
import { JSONStructure } from './jsonStructure';

const customNodeRegistry = new Map<string, BaseNodeCtorType<any>>();

/**
 * Root tree object
 */
export class BehaviorTree<T extends BaseState> {

    /**
     * Convert json structure to BehaviorTree
     * @param json JSONStructure
     */
    public static fromJSON<T extends BaseState>(json: JSONStructure): BehaviorTree<T> {
        const tree = new BehaviorTree<T>();

        // recursive tree traversal
        const createNodeInstances = (jsonNode: JSONStructure): BaseNode<T> => {
            const { id, name, children = [], ...rest } = jsonNode;

            if (!customNodeRegistry.has(id)) {
                throw new Error(`${id} node is not registered in the CustomNodeRegistry`)
            }

            const Ctor = customNodeRegistry.get(id) as BaseNodeCtorType<T>;
            const node = new Ctor({ name, ...rest });

            for (const child of children) {
                const childNode = createNodeInstances(child);
                node.addChild(childNode);
            }

            return node;
        };
        const root = createNodeInstances(json);
        tree.root = root;

        return tree;
    }

    /**
     * The method defines a new node element.
     * @param ctor
     */
    public static define<T extends BaseState>(ctor: BaseNodeCtorType<T>): void {
        const name = ctor.name;
        if (customNodeRegistry.has(name)) {
            throw new Error(`The CustomNodeRegistry already contains an entry with the same constructor: ${name}`);
        }
        customNodeRegistry.set(name, ctor);
    }

    /**
     * The root node of the AI tree, where all decision-making begins.
     * @property root
     * @type {BaseNode}
     * @private
     */
    private _root?: BaseNode<T>;

    constructor(candidate?: BaseNode<T>) {
        this.addChild(candidate);
    }

    public get root(): BaseNode<T> | undefined {
        return this._root;
    }

    private set root(candidate: BaseNode<T> | undefined) {
        if (candidate) {
            this._root = candidate;
            // this._root.addParent(this)
        }
    }

    /**
    * Adds a child to the node tree. Because this base can only have one child,
    * the root, this just calls this.setRoot().
    * @method addChild
    * @param candidate {BaseNode}
    * @return {BaseNode}
    */
    public addChild(candidate?: BaseNode<T>) {
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
    public hasDescendant(candidate: BaseNode<T>): boolean {
        if (candidate === this.root) {
            return true;
        }
        return this.root?.hasDescendant(candidate) ?? false;
    }

    /**
     * Updates the Ai tree and makes decisions. Call this once per frame.
     *
     * @public
     * @return {number} A number, a constant referring to the status of the tree.
     * @memberOf BehaviorTree
     */
    update(state: T) {
        state.status = ERROR;

        // Run the tree
        if (this.root) {
            return this.root.update(state);
        }

        return state;
    }

    /**
     * Convert BehaviorTree to JSON structure
     * @returns JSON object
     */
    public toJSON(): JSONStructure | undefined {
        const json = this.root?.toJSON();
        return json;
    }
}

export default BehaviorTree;
