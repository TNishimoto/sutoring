

type BlockTreeInfo = {
    text : string;
    root : BlockTreeNode
    degree : number
    unit : number
}
type BlockTreeNode = {
    children : BlockTreeNode[];
    reference : { node : BlockTreeNode, offset : number} | null;
    height : number;
    position : number;
    length : number
}
function getUnitLength(degree : number, unit : number, height : number){
    return unit * (degree ** height);
}
function getMark(text : string, node : BlockTreeNode, hunit : number) : boolean{
    if(node.position == 0) return true;
    const pos1 = node.position - hunit;
    const substr1 = text.substr(pos1, hunit + node.length);
    const fstOcc1 = text.indexOf(substr1);
    if(fstOcc1 == pos1){
        return true;
    }else{
        const substr2 = text.substr(node.position, hunit + node.length);
        const fstOcc2 = text.indexOf(substr2);
        if(fstOcc2 == node.position){
            return true;
        }else{
            return false;
        }
    
    }
        
}

function makeBlockTreeSub(text : string, children : BlockTreeNode[], degree : number, unit :number){
    const h = children[0].height;
    children.forEach((v) =>{
        const hunit = getUnitLength(degree, unit, v.height);
        const mark = getMark(text, v, hunit);
        if(mark){
            const nextHunit = getUnitLength(degree, unit, v.height-1);
            let t= 0;
            const endPos = v.position + v.length - 1;
            while(true){
                const nextPos = v.position + (nextHunit * t);
                const nextLength = nextPos + nextHunit - 1 <= endPos ? nextHunit : endPos - nextPos + 1;  
                const nextNode : BlockTreeNode = { children : new Array(), reference : null, height : v.height-1, position : nextPos, length : nextLength };
                v.children.push(nextNode);
                if(nextPos + nextLength - 1 == endPos){
                    break;
                }else{
                    t++;
                }
            }
        }else{
            const substr = text.substr(v.position, v.length);
            const fstOcc = text.indexOf(substr);
            for(let p=0;p<children.length;p++){
                if(children[p].position <= fstOcc && fstOcc <= children[p].position + children[p].length -1){
                    v.reference = {node : children[p], offset : fstOcc - children[p].position};
                    break;
                }
            }
        
        }
    })
    const nextChildren : BlockTreeNode[] = new Array();
    children.forEach((v)=>{
        v.children.forEach(w =>{ nextChildren.push(w);});
    })
    if(h != 0){
        makeBlockTreeSub(text, nextChildren, degree, unit);
    }

}
function computeHeight(textLength : number, degree : number, unit : number){
    let t = 0;
    let len = unit * (degree**t);
    while(len < textLength){
        t++;
        len = unit * (degree**t);
    }
    return t;
}
function view(text : string, degree : number, unit : number){
    const height = computeHeight(text.length, degree, unit);
    for(let t=height;t>=0; t--){
        const hunit = getUnitLength(degree, unit, t);
        console.log(t + "/" + hunit)
        let s = "";
        for(let x =0;x< text.length;x++){
            s += text.substr(x, 1);
            s += x % hunit == hunit-1 ? "|" : " ";
        }
        console.log(s);

    }
}

function view2Sub(text : string, children : BlockTreeNode[], output : string[]){
    let s : string[] = new Array(text.length*2);
    for(let i=0;i<s.length;i++){
        s[i] = " ";
    }
    children.forEach((v) =>{
        for(let t = 0; t < v.length;t++){
            s[(v.position + t)*2] = text[v.position+t];
        }
        s[1 + (v.position + v.length-1)*2] = "|";
    })
    const str = s.join("");
    console.log(str);
    output.push(str);
    const nextChildren = new Array(0);
    children.forEach((v)=>{
        v.children.forEach(w =>{ nextChildren.push(w);});
    })
    const h = children[0].height;
    if(h !=0){
        view2Sub(text, nextChildren, output);
    }

}

function view2(info : BlockTreeInfo){
    const r = new Array(0);
    view2Sub(info.text, [info.root], r);
}

export function makeBlockTree(text : string, degree : number = 2, unit : number = 1) : BlockTreeInfo{
    if(unit <= 0){
        throw Error("unit must be larger than 0.");
    }
    const height = computeHeight(text.length, degree, unit);
    const root : BlockTreeNode = { children : new Array(), reference : null, height : height, position : 0, length : text.length };
    
    makeBlockTreeSub(text, [root], degree, unit);
    const info : BlockTreeInfo = { text : text, root : root, unit : unit, degree : degree};
    view2(info);
    return info;
}
