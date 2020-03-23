import { Logics } from "graph-table-svg";
import * as LCPArray from "../arrays/lcp_array";
import * as Trie from "./trie";

export function construct(texts: string[]): Logics.LogicTree {
    const root = Trie.construct(texts);

    while (true) {
        let b = false;
        const nodes = root.getOrderedNodes();
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            for (let x = 0; x < node.children.length; x++) {
                const b1 = compact(node.children[x]!, node);
                if (b1) {
                    b = true;
                    break;
                }
            }
            if (b) break;
        }
        if (!b) {
            break;
        }
    }

    return root;


}
export function compact(node: Logics.LogicTree, parent: Logics.LogicTree): boolean {
    if (node.children.length == 1) {
        const p = parent.children.findIndex((v) => { return v == node });
        if (p >= 0) {
            const newChild = node.children[0]!;
            const newText = node.edgeTextContent + newChild.edgeTextContent;
            parent.children[p] = newChild;
            newChild.edgeTextContent = newText;
            return true;
        } else {
            throw Error("error");
        }
    } else {
        return false;
    }
}
