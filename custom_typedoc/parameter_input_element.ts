
import {TypeDocParameter, templateParse, parseHtmlFragments} from './lib';
import libxmljs = require('libxmljs');


function createSelectBox(name : string, keyValuePairs : [string, string][] ) : string{
        
    const optionStr = keyValuePairs.map((v) =>{
        return `<option value="${v[1]}">${v[0]}</option>`
    }).join("\n")
    const s = `<select name="${name}">
        ${optionStr}
        </select>`;
    return s;
    
}
function typedocParameterToInputElement(parameter: TypeDocParameter) : string{

    let center : string = "";
    if (parameter.type == "string") {
        let value = "abaababaabaab$";
        if(parameter.option != null && parameter.option.has("value")){
            value = parameter.option.get("value")!;
        }
        center = `<label>${parameter.name}</label><textarea name="input" cols="40" rows="1">${value}</textarea>`;
    }
    else if(parameter.type == "string[]"){
        let value = "abaababaabaab$";
        if(parameter.option != null && parameter.option.has("value")){
            value = parameter.option.get("value")!;
        }
        center = `<label>${parameter.name}</label><textarea name="input" cols="40" rows="1">${value}</textarea>`;
    } 
    else if (parameter.type == "number") {
        //const doc = new libxmlts.Document(this.element.doc());
        let min = 0;
        let value = 0;
        let size = 5;
        if (parameter.option != null) {
            const map = parameter.option;
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

        center = `<label>${parameter.name}:<input type="number" name="input"  min="${min}" size="${size}" value="${value}"></label>`;
    } else if(parameter.type == "boolean"){
        center = `<label>${parameter.name}</label>
        ${createSelectBox("select", [ ["true", "true"], ["false", "false"] ])}`;
    

    }
    else if(parameter.type == "AutoSizeShapeToFitText"){
        center = `<label>${parameter.name}</label>
        ${createSelectBox("select", [ ["auto", "auto"], ["semi-auto", "semi-auto"], ["none", "none"] ])}`;
    }
    else if(parameter.type == "VerticalAnchor"){
        center = `<label>${parameter.name}</label>
        ${createSelectBox("select", [ ["top", "top"], ["middle", "middle"], ["bottom", "bottom"] ])}`;
    }
    else if(parameter.type == "HorizontalAnchor"){
        center = `<label>${parameter.name}</label>
        ${createSelectBox("select", [ ["left", "left"], ["center", "center"], ["right", "right"] ])}`;
    }
    else if(parameter.type == "BWTOption"){
        const p1 = { name : "withBWT", type : "boolean", option : null};
        const p2 = { name : "withIndex", type : "boolean", option : null};
        const p3 = { name : "withLCP", type : "boolean", option : null};
        const p4 = { name : "withSA", type : "boolean", option : null};
        const p5 = { name : "zeroBased", type : "boolean", option : null};
        const p6 = { name : "coloredChar", type : "boolean", option : null};
        const p7 = { name : "isRLBWT", type : "boolean", option : null};
        const p8 = { name : "withMiddleSubstrings", type : "boolean", option : null};
        center = `<fieldset>
        <legend>${parameter.name}</legend>
        ${typedocParameterToInputElement(p1)}
        ${typedocParameterToInputElement(p2)}
        ${typedocParameterToInputElement(p3)}
        ${typedocParameterToInputElement(p4)}
        ${typedocParameterToInputElement(p5)}
        ${typedocParameterToInputElement(p6)}
        ${typedocParameterToInputElement(p7)}
        ${typedocParameterToInputElement(p8)}
        </fieldset>`;

    }
    else if(parameter.type == "SuffixArray.SATableOption" || parameter.type == "SATableOption" ){
        const p1 = { name : "withBWT", type : "boolean", option : null};
        const p2 = { name : "withIndex", type : "boolean", option : null};
        const p3 = { name : "withLCP", type : "boolean", option : null};
        const p4 = { name : "withSA", type : "boolean", option : null};
        const p5 = { name : "zeroBased", type : "boolean", option : null};
        center = `<fieldset>
        <legend>${parameter.name}</legend>
        ${typedocParameterToInputElement(p1)}
        ${typedocParameterToInputElement(p2)}
        ${typedocParameterToInputElement(p3)}
        ${typedocParameterToInputElement(p4)}
        ${typedocParameterToInputElement(p5)}
        </fieldset>`;

    }
    else if(parameter.type == "string | Objects.GOptions.GTextBoxCSS"){
        const p1 = { name : "autoSizeShapeToFitText", type : "AutoSizeShapeToFitText", option : null};
        const p2 = { name : "verticalAnchor", type : "VerticalAnchor", option : null};
        const p3 = { name : "horizontalAnchor", type : "HorizontalAnchor", option : null};
        center = `<fieldset>
        <legend>${parameter.name}</legend>
        ${typedocParameterToInputElement(p1)}
        ${typedocParameterToInputElement(p2)}
        ${typedocParameterToInputElement(p3)}
        </fieldset>`;
    }else if(parameter.type == "Objects.GOptions.CellAttributes"){
        const p1 = { name : "autoSizeShapeToFitText", type : "AutoSizeShapeToFitText", option : null};
        const p2 = { name : "verticalAnchor", type : "VerticalAnchor", option : null};
        const p3 = { name : "horizontalAnchor", type : "HorizontalAnchor", option : null};
        const p4 = { name : "paddingTop", type : "number", option : null};
        const p5 = { name : "paddingLeft", type : "number", option : null};
        const p6 = { name : "paddingRight", type : "number", option : null};
        const p7 = { name : "paddingBottom", type : "number", option : null};

        center = `<fieldset>
        <legend>${parameter.name}</legend>
        ${typedocParameterToInputElement(p1)}
        ${typedocParameterToInputElement(p2)}
        ${typedocParameterToInputElement(p3)}
        ${typedocParameterToInputElement(p4)}
        ${typedocParameterToInputElement(p5)}
        ${typedocParameterToInputElement(p6)}
        ${typedocParameterToInputElement(p7)}
        </fieldset>`;
    }
    return `<div data-name="${parameter.name}" data-type="${parameter.type}">${center}</div>`
}

export function createParameterInputElement(parameter: TypeDocParameter, functionID: number, parameterID: number, doc: libxmljs.Document): libxmljs.Element {
    const id = `function-${functionID}-parameter-${parameterID}`;
    //const div: libxmljs.Element = new libxmljs.Element(doc, "div", "");
    const div = libxmljs.parseHtmlFragment(typedocParameterToInputElement(parameter)).root()!;
    div.attr({id : id});
    return div;

}
