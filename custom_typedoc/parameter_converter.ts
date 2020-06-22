
import libxmljs = require('libxmljs');
import {TypeDocParameter, templateParse, parseHtmlFragments, isVisualTableType, isVisualGraphType} from './lib';


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
export function parseReturnTypeElement(parameterContainer: libxmljs.Element): TypeDocParameter {
    const w = <libxmljs.Element>parameterContainer;
    const spanNodes = w.find("*[@class='tsd-signature-type' or @class='tsd-signature-symbol']");
    const type = spanNodes.map((v) => (<libxmljs.Element>v).text()).join("");

    //const text = w.text().split(" ")[1].trim();

    //let type : string = "";
    //if(defaultFlagElement != null) spanNodes.pop();
    //type = spanNodes.map((v) => (<libxmljs.Element>v).text()).join("");

    //const name = w.get("h5")!.text().split(":")[0];
    //const type = text;
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
export function getViewCode(returnParameter : TypeDocParameter, valueName : string, titleName : string, functionID : number){
    if(isVisualTableType(returnParameter) ){
        return `const b = document.getElementById("function-${functionID}-visualize-checkbox").checked;
        if(b){ 
            sutoring.Console.table(${valueName}, ${titleName}, "function-${functionID}-code")}
            else{ 
            sutoring.Console.textarea(${valueName}, ${titleName}, {container : "function-${functionID}-code" })
        }`
    }
    else if(isVisualGraphType(returnParameter)){
        return `const b = document.getElementById("function-${functionID}-visualize-checkbox").checked;
        if(b){ 
            sutoring.Console.graph(${valueName}, ${titleName}, "function-${functionID}-code")}
            else{ 
            sutoring.Console.textarea(${valueName}, ${titleName}, {container : "function-${functionID}-code" })
        }`
    }
    else{
        return `sutoring.Console.textarea(${valueName}, ${titleName}, {container : "function-${functionID}-code" })`;
    }
}
