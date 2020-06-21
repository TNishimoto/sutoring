
import libxmljs = require('libxmljs');
import {TypeDocParameter, templateParse, parseHtmlFragments} from './lib';


export function parseParameterElements(parameterContainer: libxmljs.Element): TypeDocParameter[] {
    const r: TypeDocParameter[] = [];
    parameterContainer.childNodes().forEach((v) => {
        if (v.type() == "element") {
            const liNode = (<libxmljs.Element>v);
            const h5Node = liNode.get("h5")!;
            const defaultFlagElement = h5Node.get("span[@class='tsd-flag ts-flagDefault value']");
            const spanNodes = h5Node.find("*[@class='tsd-signature-type' or @class='tsd-signature-symbol']");
            
            let type : string = "";
            if(defaultFlagElement != null) spanNodes.pop();
            type = spanNodes.map((v) => (<libxmljs.Element>v).text()).join("");

            //console.log(spanNodes.map((v) => (<libxmljs.Element>v).name()).join(","))
            let rawText = "";
            h5Node.childNodes().forEach((w) =>{
                if(w.type() == "text" && w instanceof libxmljs.Element){
                    rawText += w.text();
                }
            })
            const name = rawText.split(":")[0];
            //const t1 = h5Node.get("span[@class='tsd-signature-type']")!;
            //const t2 = h5Node.get("a[@class='tsd-signature-type']")!;
            //const type = t1 != null ? t1.text() : t2!.text();

            const templateNode = liNode.get("div/p/template");
            if (templateNode != null) {
                //console.log(w.text() );
                const map = templateParse(templateNode);
                r.push({ name: name, type: type, option : map });
            } else {
                r.push({ name: name, type: type, option : null });
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
    return { name: "Returns", type: type, option: null };


}
function getParameterID(functionID: number, i: number) {
    return `function-${functionID}-parameter-${i}`
}
export function getArguments(parameters: TypeDocParameter[], functionID: number): string[] {
    const r: string[] = parameters.map((v, i) => {
        return `sutoring.Debug.CustomTypedoc.getParameterInputValue("${getParameterID(functionID, i)}")`; 
    })
    return r;
}
export function checkParameterConvertable(parameters: TypeDocParameter[]) : boolean {
    let b = true;
    const set = new Set<string>();
    set.add("string");
    set.add("number");
    set.add("boolean");
    set.add("string | Objects.GOptions.GTextBoxCSS");
    set.add("BWTOption")
    set.add("SuffixArray.SATableOption")
    set.add("SATableOption")
    set.add("Objects.GOptions.CellAttributes")

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
    set.add("RLEFactor[]");
    set.add("Logics.LogicCellLine");
    set.add("LogicTable");

    //set.add("Logics.LogicCellLine");

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
    if(returnParameter.type == "Logics.LogicCellLine" || returnParameter.type == "LogicTable"){
        return `const b = document.getElementById("function-${functionID}-visualize-checkbox").checked;
        if(b){ 
            sutoring.Console.table(${valueName}, ${titleName}, "function-${functionID}-code")}
            else{ 
            sutoring.Console.textarea(${valueName}, ${titleName}, {container : "function-${functionID}-code" })
        }`
        /*
        if(visualize){
            return `sutoring.Console.table(${valueName}, ${titleName}, "function-${functionID}-code")`;
        }else{
            return `sutoring.Console.textarea(${valueName}, ${titleName}, {container : "function-${functionID}-code" })`;
        }
        */
    }else{
        return `sutoring.Console.textarea(${valueName}, ${titleName}, {container : "function-${functionID}-code" })`;
    }
    /*
    if(returnParameter.type == "string" || returnParameter.type == "number"){
        return `sutoring.Console.textarea(${valueName}.toString(), ${titleName}, {container : "function-${functionID}-code" })`;
    }else if(returnParameter.type == "string[]" || returnParameter.type == "number[]"){
        return `sutoring.Console.textarea(${valueName}.join(", "), ${titleName}, {container : "function-${functionID}-code" })`;
    }else if(returnParameter.type == "RLEFactor[]"){
    }
    else{
        return `sutoring.Console.textarea(${valueName}.toString(), ${titleName}, {container : "function-${functionID}-code" })`;        
    }
    */
}
