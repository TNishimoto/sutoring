import { LogicTree } from "graph-table-svg";

export function construct(texts: string[]): LogicTree {
    const root = new LogicTree();

    texts.forEach((v) => {
        add(root, v);
    })
    return root;


}
function add(root: LogicTree, text: string): LogicTree {

    let node = root;
    for (let i = 0; i < text.length; i++) {
        node = addOrGetChild(node, text[i]);
    }
    return node;
}
function addOrGetChild(node: LogicTree, char: string): LogicTree {
    let k = 0;
    for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i]!;
        if (child.edgeOption.text == char) {
            return child;
        } else {
            if (char < child.edgeOption.text!) {

            } else {
                const newNode = new LogicTree();
                newNode.edgeOption.text = char;
                node.children.splice(i, 0, newNode);
                return newNode;
            }
        }
    }
    const newNode = new LogicTree();
    newNode.edgeOption.text = char;
    node.children.splice(node.children.length, 0, newNode);
    return newNode;

}



