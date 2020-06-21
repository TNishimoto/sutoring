
import libxmljs = require('libxmljs');
import {libxmlts} from './libxmlts';
import {TypeDocParameter, templateParse, parseHtmlFragments} from './lib';

import {parseParameterElements, getArguments, checkParameterConvertable, parseReturnParameterElement, checkReturnTypeConvertable, getViewCode} from './parameter_converter';
import {createParameterInputElement} from './parameter_input_element';

export function viewDocumentTree2(node : libxmljs.Node, space : number){
    let s = "";
    for(let i=0;i<space;i++){
        s += " ";
    }
    //console.log(node.type());

    if(node.type() == "element" && node instanceof libxmljs.Element){
        console.log(`${s}<${node.name()}>`);
        node.childNodes().forEach((v) =>{
            viewDocumentTree2(v, space+1);
        })
        console.log(`${s}</${node.name()}>`);

    }else if(node.type() == "text" && node instanceof libxmljs.Element){
        console.log(`${s}:${node.text()}`);

    }
}
export function viewDocumentTree(doc : libxmljs.Document){
    viewDocumentTree2(doc.root()!, 0);
}

export type ModuleResolver = { path: string; moduleName : string };
export function getModuleResolver(doc : libxmljs.Document) : ModuleResolver | null{
    const templateElement = doc.get(`//section[@class="tsd-panel tsd-comment"]/div[@class="tsd-comment tsd-typography"]/div/p/template`)
    if(templateElement != null){
        //const text = comment.text();
        const map = templateParse(templateElement);
        const path = map.get("path");
        const module = map.get("module");
        if(path != null && module != null){
            return {path : path, moduleName : module};
        }else{
            return null;
        }

    }else{
        return null;
    }
}




let id_counter = 0;
export class TypeDocFunctionTag{
    id : number
    element : libxmljs.Element;
    public constructor(element : libxmljs.Element){
        this.element = element;
        this.id = id_counter++;
    }
    public clearCustomElements(){
        const items = this.element.childNodes();
        items.forEach((v) =>{
            if(v instanceof libxmljs.Element && v.attr("data-custom") != null){
                v.remove();
            }
        })
    }
    public get demoID() : string{
        return `function-${this.id}`;
    }
    public createDemoElement() : libxmljs.Element{
        const div: libxmljs.Element = new libxmljs.Element(this.element.doc(), "div", "");
        div.attr({id : this.demoID });
        div.attr({"data-function-name" : `${this.functionName}`});
        
        const fieldset: libxmljs.Element = new libxmljs.Element(this.element.doc(), "fieldset", "");
        fieldset.attr({id : `function-${this.id}-parameters-fieldset`})
        const legend: libxmljs.Element = new libxmljs.Element(this.element.doc(), "legend", "Parameters");
        div.addChild(fieldset);
        fieldset.addChild(legend);

        div.attr({"data-custom" : "true"})
        this.parameters.forEach((v, i) =>{
            const p = createParameterInputElement(v, this.id, i, this.element.doc());
            fieldset.addChild(p);
        })
        return div;

    }
    /*
    */
    public get parameters() : TypeDocParameter[]{
        const list = this.element.get("ul[@class='tsd-descriptions']/li/ul[@class='tsd-parameters']");
        return list == null ? [] : parseParameterElements(list);
    }
    public get returnParameter() : TypeDocParameter | null {
        const return_h4 = this.element.get("ul[@class='tsd-descriptions']/li/h4[@class='tsd-returns-title']");
        return return_h4 == null ? null : parseReturnParameterElement(return_h4);
    }
    
    public get functionNamespace() : string {
        return "";
    }

    public get functionName() : string {
        const name = this.element.get("h3");
        if(name != null){
            return name.text().trim();
        }else{
            return "";
        }
    }
    
    public get runTag():libxmljs.Element | null{
        const tag = this.element.get("div[@name='run']");
        return tag;
    }
    public get mainFieldSet() : libxmljs.Element {
        const tag = this.element.get("div[@name='run']/fieldset");
        return tag!;

    }
    public createCustomTag() : libxmljs.Element{
        const div: libxmljs.Element = new libxmljs.Element(this.element.doc(), "div", "");
        const fieldset: libxmljs.Element = new libxmljs.Element(this.element.doc(), "fieldset", "");
        const legend: libxmljs.Element = new libxmljs.Element(this.element.doc(), "legend", "Demo");
        div.addChild(fieldset);
        fieldset.addChild(legend);

        div.attr({name: "run"});
        div.attr({"data-custom" : "true"})


        //this.element.addChild(div);
        return div;

    }
    public process(){
        this.clearCustomElements();
        if(!checkParameterConvertable(this.parameters) || !checkReturnTypeConvertable(this.returnParameter)){
            console.log(`False: ${this.functionName} ${this.parameters.map((v)=>v.type).join(", ")} ${this.returnParameter == null ? "null" : this.returnParameter.type}`)
            return;
        } 
        const mainElement = this.createCustomTag();
        this.element.addChild(mainElement);
        
        const demo = this.createDemoElement();
        this.mainFieldSet.addChild(demo);

        const button: libxmljs.Element = new libxmljs.Element(this.element.doc(), "button", "");
        button.text("Run");
        const moduleResolver = getModuleResolver(this.element.doc())!;
        //const titleCode = getTitleCode(this.parameters, this.functionName, this.id);
        const viewCode = getViewCode(this.returnParameter!, "value", "title", this.id);
        const buttonClickEvent = `const value = ${moduleResolver.path}.${moduleResolver.moduleName}.${this.functionName}(${getArguments(this.parameters, this.id).join(",") });
        const title = sutoring.Debug.CustomTypedoc.getTitle("${this.demoID}");
        ${viewCode};`;
        button.attr({"onClick" : buttonClickEvent });
        this.mainFieldSet.addChild(button);

        if(this.returnParameter != null && this.returnParameter.type == "Logics.LogicCellLine"){
            const visualizeLabel : libxmljs.Element = new libxmljs.Element(this.element.doc(), "label", "  Visualize");
            const visualizeCheckbox : libxmljs.Element = new libxmljs.Element(this.element.doc(), "input", "");
            visualizeCheckbox.attr({ id : `function-${this.id}-visualize-checkbox`});
            visualizeCheckbox.attr({ type : "checkbox"})
            visualizeCheckbox.attr({ checked : "checked"})
            visualizeCheckbox.attr({ name : "visualize-checkbox"})
            this.mainFieldSet.addChild(visualizeLabel);
            this.mainFieldSet.addChild(visualizeCheckbox);

        }

        const codeFieldset: libxmljs.Element = new libxmljs.Element(this.element.doc(), "fieldset", "");
        const codeLegend: libxmljs.Element = new libxmljs.Element(this.element.doc(), "legend", "Result");


        const code: libxmljs.Element = new libxmljs.Element(this.element.doc(), "code", "");
        code.attr({"id" : `function-${this.id}-code`});
        mainElement.addChild(codeFieldset);
        codeFieldset.addChild(codeLegend);
        codeFieldset.addChild(code);


    }

}
export function createCodeTag(text: string, doc: libxmljs.Document): libxmljs.Element {
    const pre: libxmljs.Element = new libxmljs.Element(doc, "pre", "");
    const code: libxmljs.Element = new libxmljs.Element(doc, "code", text);
    pre.addChild(code);
    return pre;
}

const sutoringSrc = "https://cdn.jsdelivr.net/npm/sutoring@0.0.17/docs/sutoring.js";
//const sutoringSrc = "../../sutoring.js";

export function processHeadTag(doc: libxmljs.Document){
    const head = doc.get("//head");
    if(head != null){
        const scriptTags = head.find("script");
        scriptTags.forEach((v) => v.remove());
        const scriptSutoring: libxmljs.Element = new libxmljs.Element(doc, "script", "");
        scriptSutoring.attr({src : sutoringSrc})
        head.addChild(scriptSutoring);    
        const stopScriptStr = `window.onload = (event) => {
            window.addEventListener("keydown", function(event) {
                event.stopPropagation();
            }, true);
            window.addEventListener("keypress", function(event) {
                event.stopPropagation();
            }, true);
        };`

        const stopScript: libxmljs.Element = new libxmljs.Element(doc, "script", stopScriptStr );
        head.addChild(stopScript);
    }
    
}