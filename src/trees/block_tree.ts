
import { Logics, Common, Objects } from "graph-table-svg";
import { ShapeObjectType } from "graph-table-svg/dist/common/enums";
import { GObject, GVertex, GTable } from "graph-table-svg/dist/objects";
//import { GVertex } from "graph-table-svg/dist/objects";
//import { LogicTable } from "graph-table-svg";

export type BlockTreeInfo = {
    text: string;
    root: BlockTreeNode
    degree: number
    unit: number
}
export type BlockTreeNode = {
    children: BlockTreeNode[];
    reference: { position : number, offset : number} | null;
    height: number;
    position: number;
    length: number
}
/*
export type BlockTreeNodeInfoForLogicNode = {
    reference: number | null;
    position: number;
    length: number
}
*/
function getLibPath(): string {
    const env = process.env
    if (env.GTS_DEBUG == "TRUE" && env.GTS_SPATH === undefined) {
        throw Error("DEBUG ERROR");
    }

    const path = env.GTS_DEBUG == "TRUE" && env.GTS_SPATH !== undefined ? env.GTS_SPATH : "https://cdn.jsdelivr.net/npm/sutoring/docs/sutoring.js";
    return path;
}

//function depth(node : Objects.)

function depth(node: Objects.GVertex): number {
    if (node.isNoParent) {
        return 1;
    } else {
        return 1 + depth(node.parent!);
    }
}
function depthLeftToRightOrder(root: Objects.GVertex): Objects.GVertex[] {
    const nodes = root.createVirtualTree().getSubtree();
    const h = root.createVirtualTree().getHeight();
    const arr: Objects.GVertex[][] = new Array(h);
    for(let i=0;i<arr.length;i++) arr[i] = new Array(0);
    nodes.forEach((v) => {
        console.log(`${h} ${depth(v)}`)
        
        arr[h - depth(v)].push(v);
    }
    );
    const arr2: Objects.GVertex[] = new Array(0);

    arr.forEach((v) => {
        v.forEach((w) => {
            arr2.push(w);
        })
    });
    return arr2;

}

function palse(root: Objects.GVertex) {
    const nodeMap : Map<string, GVertex> = new Map();
    depthLeftToRightOrder(root).forEach((w) => {
        const tree = w.createVirtualTree();
        const depth1 = depth(w);
        w.y = depth1 * 50;
        w.x = 0;
        const type = w.svgGroup.getAttribute("data-bt-type")!;
        if(type == "node"){
            nodeMap.set(`${w.svgGroup.getAttribute("data-bt-position")!}_${w.svgGroup.getAttribute("data-bt-height")!}`, w);
            console.log("add" + `${w.svgGroup.getAttribute("data-bt-position")!}_${w.svgGroup.getAttribute("data-bt-height")!}`)
        }

        if (tree.children.length == 0) {
        } else if (tree.children.length == 1) {
            w.x = 0;
        } else {
            let px = 0;
            w.children.forEach((q, i) => {
                const subtree = q.createVirtualTree();
                subtree.setRegionXYLocation(px, q.y);

                if (i < w.children.length - 1) {
                    px += q.getVirtualWidth();
                } else {
                    px += q.getVirtualWidth();
                }
                
            })
            w.x = 0;

            //w.cx = px / 2;
        }
    })

    depthLeftToRightOrder(root).forEach((w) => {
        const type = w.svgGroup.getAttribute("data-bt-type")!;
        if(type == "referrence"){
            const position = w.svgGroup.getAttribute("data-bt-position")!;
            const offset = Number.parseInt(w.svgGroup.getAttribute("data-bt-offset")!);
            const height = w.parent!.svgGroup.getAttribute("data-bt-height")
            console.log("_" + `${position}_${height}`)
            const refNode = <GTable>nodeMap.get(`${position}_${height}`)!;
            const x = refNode.x + refNode.cells[0][offset].x;
            const y = refNode.y + refNode.getRegion().height + 25;
            w.x = x;
            w.y = y;
        }

    })



}

export function draw(graph: Objects.GGraph) {
    graph.relocateStyle = null;
    palse(graph.rootVertex!);

    console.log("hello")
}
export function convert(blocktree: BlockTreeInfo): Logics.LogicTree {
    const recFun : (v : BlockTreeNode) => Logics.LogicTreeNode = (v: BlockTreeNode) => {
        const node = new Logics.LogicTreeNode();
        const vertexText = blocktree.text.substr(v.position, v.length);
        const table = new Logics.LogicTable({ columnCount: vertexText.length, rowCount: 1 });
        node.shapeObject = table;
        
        table.option.attributes = { "data-bt-type" : "node" , "data-bt-position" : v.position.toString(), "data-bt-length" : v.length.toString(), "data-bt-height" : v.height.toString()}
        

        
        for (let i = 0; i < vertexText.length; i++) {
            table.cells[0][i].text.textContent = vertexText[i];
            table.cells[0][i].groupOption.class = {paddingLeft : 5, paddingRight : 5}
            if(i < vertexText.length-1){
                table.cells[0][i].rightBorderOption.style = { stroke : "transparent"}
            }
        }


        if (v.reference != null) {
            const leaf = new Logics.LogicTreeNode();
            const leafShape = new Logics.LogicBasicShape({shape : Common.Enums.ShapeObjectType.Rect});
            
            //leaf.vertexShape = Common.Enums.ShapeObjectType.Rect;
            leafShape.option.attributes = { "data-bt-type" : "referrence", "data-bt-position" : v.reference.position.toString(), "data-bt-offset" : v.reference.offset.toString() }

            leafShape.item = v.reference;

            leafShape.textContent = `${v.reference}`
            leaf.shapeObject = leafShape;
            node.children.push(leaf);
        } else {

            if (v.height > 0) {
                node.children = v.children.map((w) => {
                    return recFun(w);
                })
            }
        }
        return node;
    }
    const root = recFun(blocktree.root);
    const tree = new Logics.LogicTree();
    tree.root = root;
    //tree.drawingFunction = 
    tree.graphOption.relocateStyle = undefined;
    tree.graphOption.drawingFunction = { url: getLibPath(), functionName: "sutoring.Trees.BlockTree.draw", drawingFunction: null }
    return tree;
}
function getUnitLength(degree: number, unit: number, height: number) {
    return unit * (degree ** height);
}
function getMark(text: string, node: BlockTreeNode, hunit: number): boolean {
    if (node.position == 0) return true;
    const pos1 = node.position - hunit;
    const substr1 = text.substr(pos1, hunit + node.length);
    const fstOcc1 = text.indexOf(substr1);
    if (fstOcc1 == pos1) {
        return true;
    } else {
        const substr2 = text.substr(node.position, hunit + node.length);
        const fstOcc2 = text.indexOf(substr2);
        if (fstOcc2 == node.position) {
            return true;
        } else {
            return false;
        }

    }

}

function makeBlockTreeSub(text: string, children: BlockTreeNode[], degree: number, unit: number) {
    const h = children[0].height;
    if (h >= 1) {
        children.forEach((v) => {
            const hunit = getUnitLength(degree, unit, v.height);
            const mark = getMark(text, v, hunit);
            if (mark) {
                const nextHunit = getUnitLength(degree, unit, v.height - 1);
                let t = 0;
                const endPos = v.position + v.length - 1;
                while (true) {
                    const nextPos = v.position + (nextHunit * t);
                    const nextLength = nextPos + nextHunit - 1 <= endPos ? nextHunit : endPos - nextPos + 1;
                    const nextNode: BlockTreeNode = { children: new Array(), reference: null, height: v.height - 1, position: nextPos, length: nextLength };
                    v.children.push(nextNode);
                    if (nextPos + nextLength - 1 == endPos) {
                        break;
                    } else {
                        t++;
                    }
                }
            } else {
                const substr = text.substr(v.position, v.length);
                const fstOcc = text.indexOf(substr);
                
                for (let p = 0; p < children.length; p++) {
                    if (children[p].position <= fstOcc && fstOcc <= children[p].position + children[p].length - 1) {
                        //v.reference = fstOcc;
                        v.reference = { position: children[p].position, offset: fstOcc - children[p].position };
                        break;
                    }
                }
                

            }
        })
    }
    const nextChildren: BlockTreeNode[] = new Array();
    children.forEach((v) => {
        v.children.forEach(w => { nextChildren.push(w); });
    })
    if (h >= 1) {
        makeBlockTreeSub(text, nextChildren, degree, unit);
    }

}
function computeHeight(textLength: number, degree: number, unit: number) {
    let t = 0;
    let len = unit * (degree ** t);
    while (len < textLength) {
        t++;
        len = unit * (degree ** t);
    }
    return t;
}
function view(text: string, degree: number, unit: number) {
    const height = computeHeight(text.length, degree, unit);
    for (let t = height; t >= 0; t--) {
        const hunit = getUnitLength(degree, unit, t);
        console.log(t + "/" + hunit)
        let s = "";
        for (let x = 0; x < text.length; x++) {
            s += text.substr(x, 1);
            s += x % hunit == hunit - 1 ? "|" : " ";
        }
        console.log(s);

    }
}

function view2Sub(text: string, children: BlockTreeNode[], output: string[]) {
    let s: string[] = new Array(text.length * 2);
    for (let i = 0; i < s.length; i++) {
        s[i] = " ";
    }
    children.forEach((v) => {
        for (let t = 0; t < v.length; t++) {
            s[(v.position + t) * 2] = text[v.position + t];
        }
        s[1 + (v.position + v.length - 1) * 2] = "|";
    })
    const str = s.join("");
    console.log(str);
    output.push(str);
    const nextChildren = new Array(0);
    children.forEach((v) => {
        v.children.forEach(w => { nextChildren.push(w); });
    })
    const h = children[0].height;
    if (h != 0) {
        view2Sub(text, nextChildren, output);
    }

}

function view2(info: BlockTreeInfo) {
    const r = new Array(0);
    view2Sub(info.text, [info.root], r);
}

export function makeBlockTree(text: string, degree: number = 2, unit: number = 1): BlockTreeInfo {
    if (unit <= 0) {
        throw Error("unit must be larger than 0.");
    }
    const height = computeHeight(text.length, degree, unit);
    const root: BlockTreeNode = { children: new Array(), reference: null, height: height, position: 0, length: text.length };

    makeBlockTreeSub(text, [root], degree, unit);
    const info: BlockTreeInfo = { text: text, root: root, unit: unit, degree: degree };
    view2(info);
    return info;
}
