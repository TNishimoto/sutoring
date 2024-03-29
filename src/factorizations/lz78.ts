/**
 * This namespace provides functions for Lempel-Ziv 78 compression.
 * <template data-path="sutoring.Factorizations" data-module="LZ78"></template>
 * @packageDocumentation
 */

import { Logics } from "graph-table-svg"
export type LZ78Factor = { id: number, nextChar: string };
export type LZ78Node = { id: number, children: Map<string, LZ78Node> }
//type RevLZ78Node = { char : string, parent : number | null }

/**
 * Return the LZ78 factors and LZ78 nodes of a given string.
 * @param text Input string
 */
function preprocess(text: string): [LZ78Factor[], LZ78Node[]] {
    let nodeCount = 0;
    const root = { id: nodeCount++, children: new Map() };
    let currentNode = root;
    let factors: LZ78Factor[] = new Array();
    const nodes: LZ78Node[] = [root];
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (currentNode.children.has(char)) {
            currentNode = currentNode.children.get(char)!;
        } else {
            factors.push({ id: currentNode.id, nextChar: char });
            const newNode = { id: nodeCount++, children: new Map() };
            currentNode.children.set(char, newNode);
            currentNode = root;
            nodes.push(newNode);
        }
    }
    if (currentNode != root) {
        factors.push({ id: currentNode.id, nextChar: "" });
        const newNode = { id: nodeCount++, children: new Map() };
        currentNode.children.set("", newNode);
        currentNode = root;
        nodes.push(newNode);
    }

    return [factors, nodes];
}
/**
 * Return the string represented a given LZ78 factors.
 * @param factors Input LZ78 factors
 */
function extract(factors: LZ78Factor[]): string[] {
    const r: string[] = new Array();
    factors.forEach((f, i) => {
        if (f.id == 0) {
            //r.push({char:f.nextChar, parent : null});
            r.push(f.nextChar);
        } else {
            const str = r[f.id - 1] + f.nextChar;
            r.push(str);
        }
    })
    return r;
}

/**
 * Compuress a given string into LZ78 factors, 
 * and return the string array whose i-th string is the string represented by i-th LZ78 factor.
 * @param text Input string
 */
export function factorize(text: string): string[] {
    const p = preprocess(text);
    const parsedStrings = extract(p[0]);
    return parsedStrings;
}
/**
 * Return the LZ78 factors of a given string.
 * @param text Input string
 */
export function compress(text: string): LZ78Factor[] {
    const p = preprocess(text);
    return p[0];
}

/**
 * Return a logic table representing the LZ78 factors of a given string.
 * @param text Input string
 */
export function constructLZ78Table(text: string): Logics.LogicTable {
    const comp = compress(text);
    const indexLine = Logics.getIndexArrayTableLine(comp.length);
    const idLine = Logics.buildLogicCellLine("id", comp.map((v, i) => v.id));
    const characterLine = Logics.buildLogicCellLine("character", comp.map((v, i) => v.nextChar))
    return Logics.buildLogicTable(
        [indexLine, idLine, characterLine]
    , { isRowLines: true })
    /*
    const table = new GraphTableSVG.LogicTable({rowCount : 3, columnCount : comp.length+1});
    StrFunctions.LogicGraphTable.setRow(table, 0, "index", comp.map((v,i) => i) );
    StrFunctions.LogicGraphTable.setRow(table, 1, "id", comp.map((v,i) => v.id) )
    StrFunctions.LogicGraphTable.setRow(table, 2, "character", comp.map((v,i) => v.nextChar) )

    return table;
    */
}
/**
 * Return a logic tree representing the LZ78 trie of a given string.
 * @param text Input string
 */
export function constructLZ78Trie(text: string): Logics.LogicTree {
    const nodes = preprocess(text)[1];
    //const graph = new Tree();            
    const graphNodes = nodes.map((v) => new Logics.LogicTreeNode());
    //graph.root = graphNodes[0];
    nodes.forEach((v, i) => {
        const graphNode = graphNodes[v.id];
        const shape = graphNode.shapeObject;
        if(shape instanceof Logics.LogicBasicShape){
            shape.textContent = (v.id).toString();
            shape.option.textClass = { fontSize: "18px" }
    
        } 

        v.children.forEach((value, key) => {

            //const e = new GraphEdge();
            const child = graphNodes[value.id];
            child.edgeOption.text = key;
            graphNodes[v.id].children.push(child);

            // e.endNode = graphNodes[value.id];
            //const startNode = graphNodes[v.id];
            //startNode.outputEdges.push(e);
            //graph.edges.push(e);
        })
    })
    const tree = new Logics.LogicTree();
    tree.root = graphNodes[0];
    return tree;
}

//}