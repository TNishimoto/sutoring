

import {LogicGraphTable} from "./graph_table"
import {LogicTable} from "logic_table"
import {LogicTree} from "logic_tree"
//import {LogicTable} from "../../GraphTableSVG/dist/options/logic_table"
//import {LogicTree} from "../../GraphTableSVG/dist/options/logic_tree"

//namespace StrFunctions {
    /**
     * This namespace provides functions for Lempel-Ziv 78 compression.
     */
    export namespace LZ78{
        export type LZ78Factor = { id : number, nextChar : string };
        export type LZ78Node = { id : number, children : Map<string, LZ78Node>}
        //type RevLZ78Node = { char : string, parent : number | null }

        function preprocess(text : string) : [LZ78Factor[], LZ78Node[]] {
            let nodeCount = 0;
            const root = { id: nodeCount++, children : new Map() };
            let currentNode = root;
            let factors : LZ78Factor[] = new Array(); 
            const nodes : LZ78Node[] = [root];
            for(let i=0;i<text.length;i++){
                const char = text[i];
                if(currentNode.children.has(char )){
                    currentNode = currentNode.children.get(char)!;                    
                }else{
                    factors.push({id : currentNode.id, nextChar : char});
                    const newNode = {id : nodeCount++, children : new Map()};
                    currentNode.children.set(char, newNode );
                    currentNode = root;
                    nodes.push(newNode);
                }    
            }
            if(currentNode != root){
                factors.push({id : currentNode.id, nextChar : ""});
                const newNode = {id : nodeCount++, children : new Map()};
                currentNode.children.set("", newNode );
                currentNode = root;    
                nodes.push(newNode);
            }

            return [factors, nodes];
        }
        function extract(factors : LZ78Factor[]) : string[]{
            const r : string[] = new Array();
            factors.forEach((f, i) =>{
                if(f.id == 0){
                    //r.push({char:f.nextChar, parent : null});
                    r.push(f.nextChar);
                }else{
                    const str = r[f.id-1] + f.nextChar;
                    r.push(str);
                }
            })
            return r;
        }

        export function factorize(text : string) : string[]{
            const p = preprocess(text);
            const parsedStrings = extract(p[0]);
            return parsedStrings;
        }
        export function compress(text :string) : LZ78Factor[]{
            const p = preprocess(text);
            return p[0];

        }
        export function constructLZ78Table(text : string) : LogicTable {
            const comp = compress(text);
            return LogicGraphTable.createLogicTable([
                //{name : "index", values : comp.map((v,i) => i)  },
                {name : "id", values : comp.map((v,i) => v.id)  },
                {name : "character", values : comp.map((v,i) => v.nextChar)  }
            ], {isRowLines : true, withIndex : true} )
            /*
            const table = new GraphTableSVG.LogicTable({rowCount : 3, columnCount : comp.length+1});
            StrFunctions.LogicGraphTable.setRow(table, 0, "index", comp.map((v,i) => i) );
            StrFunctions.LogicGraphTable.setRow(table, 1, "id", comp.map((v,i) => v.id) )
            StrFunctions.LogicGraphTable.setRow(table, 2, "character", comp.map((v,i) => v.nextChar) )

            return table;
            */
        }
        export function constructLZ78Trie(text : string) : LogicTree {
            const nodes = preprocess(text)[1];
            //const graph = new Tree();            
            const graphNodes = nodes.map((v) => new LogicTree() );
            //graph.root = graphNodes[0];
            nodes.forEach((v, i) =>{
                graphNodes[v.id].vertexText = (v.id).toString();

                v.children.forEach((value, key) =>{
                    
                    //const e = new GraphEdge();
                    const child = graphNodes[value.id];
                    child.parentEdgeText = key;
                    graphNodes[v.id].children.push(child);

                   // e.endNode = graphNodes[value.id];
                    //const startNode = graphNodes[v.id];
                    //startNode.outputEdges.push(e);
                    //graph.edges.push(e);
                })
            })
            return graphNodes[0];
        }
    }
//}