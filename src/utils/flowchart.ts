import { BaseNode } from "../baseNode";
import BehaviorTree from "../behaviorTree";

export function flowchart(tree: BehaviorTree<any>): string {
    const flow: string[] = ['graph TD;'];
    const nameToNumberMap = new Map<string, number>();
    const nodeToNameMap = new Map<BaseNode<any>, string>();

    const uniqueName = (node: BaseNode<any>): string => {
        if (nodeToNameMap.has(node)) {
            return nodeToNameMap.get(node)!;
        }
        const suffix = `(${node.constructor.name}:${node.name})`;
        if (nameToNumberMap.has(node.constructor.name)) {
            const count: number = nameToNumberMap.get(node.constructor.name)!;
            nameToNumberMap.set(node.constructor.name, count + 1);
            const newName = `${node.constructor.name}${count}${suffix}`;
            nodeToNameMap.set(node, newName);
            return newName;
        } else {
            const name = `${node.constructor.name}${suffix}`;
            nodeToNameMap.set(node, name);
            nameToNumberMap.set(node.constructor.name, 1);
            return name;
        }
    };

    const dfs = (root?: BaseNode<any>) => {
        if (!root) {
            return;
        }

        const name = uniqueName(root);
        if (root.children && root.children.length > 0) {
            for (const child of root.children) {
                const childName = uniqueName(child);
                flow.push(`${name} --> ${childName}`);
            }
            for (const child of root.children) {
                dfs(child);
            }
        } else if (flow.length === 1) {// when there is only single node in a tree
            flow.push(name);
        }
    };

    dfs(tree.root);

    return flow.join('\n');
}

export default flowchart;
