import { AutoSizeShapeToFitText, VerticalAnchor, HorizontalAnchor } from "graph-table-svg/dist/common/enums";
import { Options } from "graph-table-svg";



export function getTitle(inputDemoID: string ): string {
    const demoElement = document.getElementById(inputDemoID)!;
    const functionName = demoElement.getAttribute("data-function-name")!;
    const fieldSetElement = document.getElementById(`${inputDemoID}-parameters-fieldset`)!;

    const r : string[] = [];
    for(let i=0;i<fieldSetElement.children.length;i++){
        const item = fieldSetElement.children.item(i)!;
        if(item.nodeName == "DIV"){
            const id = item.getAttribute("id")!;
            const str = Options.stringify(getParameterInputValue(id));
            r.push(str.toString());
        }
    }
    return `${functionName}(${r.join(",")})`;
    
}

function divFinder(div: HTMLElement) : HTMLElement[]{
    const fieldSet = div.children.item(0)!;
    const r : HTMLElement[] = [];
    for(let i=0;i<fieldSet.children.length;i++){
        const item = fieldSet.children.item(i)!;
        if(item.nodeName == "DIV"){
            r.push(<HTMLElement>item);
        }
    }
    return r;
}

function getParameterInputValue2(div : HTMLElement ): any{
    const divElements = divFinder(div);
    let obj : any = {};
    divElements.forEach((v) =>{
        const name = v.getAttribute("data-name")!;
        const value = getParameterInputValue(v);
        obj[name] = value;
    })
    return obj;
}

export function getParameterInputValue(inputElementID: string | HTMLElement ): any {
    if(typeof(inputElementID) == "string"){
        const div = document.getElementById(inputElementID)!;
        return getParameterInputValue(div);

    }else{
        const div = inputElementID;
        const type = div.getAttribute("data-type")!;
        if (type == "string") {
            const textarea = div.getElementsByTagName("textarea").item(0)!;
            return textarea.value;
        }
        else if (type == "string[]") {
            const textarea = div.getElementsByTagName("textarea").item(0)!;
            return textarea.value.split(",").map((v)=>v.trim());
        }  
        else if (type == "number") {
            const input = div.getElementsByTagName("input").item(0)!;
            return input.value;
        } else if(type == "boolean"){
            const input = div.getElementsByTagName("select").item(0)!;
            return input.value == "true";
        } else if(type == "AutoSizeShapeToFitText"){
            const input = div.getElementsByTagName("select").item(0)!;
            return <AutoSizeShapeToFitText>input.value;
        }else if(type == "VerticalAnchor"){
            const input = div.getElementsByTagName("select").item(0)!;
            return <VerticalAnchor>input.value;
        }else if(type == "HorizontalAnchor"){
            const input = div.getElementsByTagName("select").item(0)!;
            return <HorizontalAnchor>input.value;
        }else if(type == "string | Objects.GOptions.GTextBoxCSS"){
            return getParameterInputValue2(div);
        }else if(type == "BWTOption"){
            return getParameterInputValue2(div);
        }else if(type == "SuffixArray.SATableOption" || type == "SATableOption"){
            return getParameterInputValue2(div);
        }else if(type == "Objects.GOptions.CellAttributes"){
            const s = getParameterInputValue2(div);
            return s;
        }
        else {
            throw new Error("error");
        }
    }
    
}
