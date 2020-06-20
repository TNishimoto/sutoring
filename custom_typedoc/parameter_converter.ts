import libxmljs = require('libxmljs');
export type TypeDocParameter = { name: string; type: string, comment: string | null };

export function commentParse(comment: string): Map<string, string> {
    const map = new Map<string, string>();
    const arrs = comment.split(" ");
    for (let i = 0; i < arrs.length - 1; i++) {
        if (arrs[i].length > 0 && arrs[i][0] == "@") {
            const name = arrs[i].substr(1);
            const value = arrs[i + 1];
            map.set(name, value);
        }
    }
    return map;
}
export function parseHtmlFragments(str: string): libxmljs.Node[] {
    const doc = libxmljs.parseHtmlFragment(`<root>${str}</root>`);
    return doc.root()!.childNodes();
}

export function parseParameterElements(parameterContainer: libxmljs.Element): TypeDocParameter[] {
    const r: TypeDocParameter[] = [];
    parameterContainer.childNodes().forEach((v) => {
        if (v.type() == "element") {
            const w = <libxmljs.Element>v;
            const name = w.get("h5")!.text().split(":")[0];
            const type = w.get("h5/span")!.text();
            const commentNode = w.get("div/p/comment()");
            if (commentNode != null) {
                //console.log(w.text() );
                r.push({ name: name, type: type, comment: commentNode.text() });
            } else {
                r.push({ name: name, type: type, comment: null });
            }
        }
    })
    return r;
}
export function parseReturnParameterElement(parameterContainer: libxmljs.Element): TypeDocParameter {
    const w = <libxmljs.Element>parameterContainer;
    const text = w.text().split(" ")[1].trim();
    //const name = w.get("h5")!.text().split(":")[0];
    const type = text;
    const commentNode = w.get("div/p/comment()");
    return { name: "Returns", type: type, comment: null };


}


export function createParameterInputElement(parameter: TypeDocParameter, functionID: number, parameterID: number, doc: libxmljs.Document): libxmljs.Element {
    if (parameter.type == "string") {
        const div: libxmljs.Element = new libxmljs.Element(doc, "div", "");

        const fragments = parseHtmlFragments(`<label>${parameter.name}</label><textarea id="function-${functionID}-parameter-${parameterID}" cols="40" rows="4" maxlength="20" ></textarea>`);
        fragments.forEach((v) => {
            if (v instanceof libxmljs.Element) {
                div.addChild(v)
            }
        }
        )
        return div;

    } else if (parameter.type == "number") {
        //const doc = new libxmlts.Document(this.element.doc());
        let min = 0;
        let value = 0;
        let size = 5;
        if (parameter.comment != null) {
            const map = commentParse(parameter.comment);
            if (map.has("min")) {
                min = Number.parseInt(map.get("min")!);
            }
            if (map.has("value")) {
                value = Number.parseInt(map.get("value")!);
            }
            if (map.has("size")) {
                size = Number.parseInt(map.get("size")!);
            }
        }

        const fragments = parseHtmlFragments(`<label>${parameter.name}:<input id="function-${functionID}-parameter-${parameterID}" type="number" name="number"  min="${min}" size="${size}" value="${value}"></label>`);
        const r = fragments[0];
        return <libxmljs.Element>r;
    }
    const div: libxmljs.Element = new libxmljs.Element(doc, "div", "");
    return div;
}
export function getParametrInputValue(parameter: TypeDocParameter, inputElementID: string): string {
    if (parameter.type == "string") {
        return `document.getElementById("${inputElementID}").value`
    } else if (parameter.type == "number") {
        return `document.getElementById("${inputElementID}").value`
    } else {
        return "";
    }
}
function getParameterID(functionID: number, i: number) {
    return `function-${functionID}-parameter-${i}`
}

export function getTitleCode(parameters: TypeDocParameter[], functionName: string, functionID: number): string {
    let titleCode = `const title = "${functionName}("`;
    parameters.forEach((v, i) => {
        const value = getParametrInputValue(v, getParameterID(functionID, i))
        titleCode += `+ ${value}.toString()`;
    })
    titleCode += `+ ")"`
    return titleCode;
}
export function getArguments(parameters: TypeDocParameter[], functionID: number): string[] {
    const r: string[] = parameters.map((v, i) => {
        return getParametrInputValue(v, getParameterID(functionID, i));

    })
    return r;
}
export function checkParameterConvertable(parameters: TypeDocParameter[]) : boolean {
    let b = true;
    const set = new Set<string>();
    set.add("string");
    set.add("number");

    parameters.forEach((v) =>{
        if(!set.has(v.type)){
            b = false;
        }
    })
    return b;
}
export function checkReturnTypeConvertable(returnParameter : TypeDocParameter | null) : boolean {
    let b = true;
    const set = new Set<string>();
    set.add("string");
    set.add("string[]");
    set.add("number");
    set.add("number[]");

    if(returnParameter != null){
        if(!set.has(returnParameter.type)){
            b = false;
        }
    }else{
        b = false;
    }
    return b;
}
export function getViewCode(returnParameter : TypeDocParameter, valueName : string, titleName : string, functionID : number){
    if(returnParameter.type == "string" || returnParameter.type == "number"){
        return `sutoring.Console.textarea(${valueName}.toString(), ${titleName}, {container : "function-${functionID}-code" })`;
    }else if(returnParameter.type == "string[]" || returnParameter.type == "number[]"){
        return `sutoring.Console.textarea(${valueName}.join(", "), ${titleName}, {container : "function-${functionID}-code" })`;
    }else{
        return `sutoring.Console.textarea(${valueName}.toString(), ${titleName}, {container : "function-${functionID}-code" })`;        
    }
}
