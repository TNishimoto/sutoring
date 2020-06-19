//import { Logics, Objects } from "xmldom"
import path = require("path")
import fs = require('fs');
//const jsdom = require('jsdom');
//const libxmljs = require("libxmljs");
import libxmljs = require('libxmljs');

//import {libxmlts} from './libxmlts';
//const { JSDOM } = jsdom;

type TypeDocParameter = { name: string; type : string };

class TypeDocFunctionTag{
    element : libxmljs.Element;
    public constructor(element : libxmljs.Element){
        this.element = element;
    }
    public get parameters() : TypeDocParameter[]{
        const list = this.element.get("ul[@class='tsd-descriptions']/li/ul[@class='tsd-parameters']");
        if(list != null){
            const r : TypeDocParameter[] = [];
            list.childNodes().forEach((v) =>{
                if(v.type() == "element"){
                    const w = <libxmljs.Element>v;
                    const name = w.get("h5")!.text().split(":")[0];
                    const type = w.get("h5/span")!.text();
                    r.push({name : name, type : type});
                }
            })
            return r;
        }else{
            return [];
        }
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
    public createCodeTag() : libxmljs.Element{
        if(this.runTag == null){
            const div: libxmljs.Element = new libxmljs.Element(this.element.doc(), "div", "");
            const button: libxmljs.Element = new libxmljs.Element(this.element.doc(), "button", "");
            button.text("test");
            div.addChild(button);
            div.attr({name: "run"});
            this.element.addChild(div);
            return div;
        
        }else{
            return this.runTag;
        }
    }
    public process(){
        this.createCodeTag();
        this.parameters.forEach((v) =>{
            console.log(v);
        })
        console.log(this.functionName )
        console.log(this.functionName.length)        
    }

}
export function createCodeTag(text: string, doc: libxmljs.Document): libxmljs.Element {
    const pre: libxmljs.Element = new libxmljs.Element(doc, "pre", "");
    const code: libxmljs.Element = new libxmljs.Element(doc, "code", text);
    pre.addChild(code);
    return pre;
}
export function processHeadTag(doc: libxmljs.Document){
    const head = doc.get("//head");
    if(head != null){
        const scriptTag = head.get("script");
        const scriptSrc = "https://cdn.jsdelivr.net/npm/sutoring@0.0.93/docs/sutoring.js";
        if(scriptTag == null){
            const script: libxmljs.Element = new libxmljs.Element(xmlDoc, "script", "");
            script.attr({src : scriptSrc})
            head.addChild(script);    
        }else{
            if(scriptTag.attr("src")?.value() != scriptSrc){
                scriptTag.attr({src : scriptSrc})                
            }
        }
    }
    
}


const inputPath = "../docs/typedoc/modules/_src_sequences_thue_morse_sequence_.html"


const text = fs.readFileSync(inputPath, {encoding: "utf-8"});
const xmlDoc = libxmljs.parseHtmlString(text);
processHeadTag(xmlDoc);

const res = xmlDoc.find("//section[@class='tsd-panel tsd-member tsd-kind-function tsd-parent-kind-module']");
res.forEach(element => {
    const item = new TypeDocFunctionTag(element);
    item.process();
});
//console.log(xmlDoc.toString());
fs.writeFileSync(inputPath, xmlDoc.toString(),{encoding: "utf-8"} );


console.log("helloworlds")