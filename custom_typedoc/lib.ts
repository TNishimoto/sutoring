
import libxmljs = require('libxmljs');
import fs = require('fs');
import path = require("path")

export type TypeDocParameter = { name: string; type: string, option: Map<string,string> | null };


//export const sutoringSrc = "https://cdn.jsdelivr.net/npm/sutoring@0.0.17/docs/sutoring.js";
export const sutoringSrc = "../../sutoring.js";

export const allowedParameterTypes : Set<string> = new Set<string>();
allowedParameterTypes.add("string");
allowedParameterTypes.add("number");
allowedParameterTypes.add("boolean");
allowedParameterTypes.add("string | Objects.GOptions.GTextBoxCSS");
allowedParameterTypes.add("BWTOption")
allowedParameterTypes.add("SuffixArray.SATableOption")
allowedParameterTypes.add("SATableOption")
allowedParameterTypes.add("Objects.GOptions.CellAttributes")

export const allowedReturnTypes : Set<string> = new Set<string>();
allowedReturnTypes.add("string");
allowedReturnTypes.add("string[]");
allowedReturnTypes.add("number");
allowedReturnTypes.add("number[]");
allowedReturnTypes.add("RLEFactor[]");
allowedReturnTypes.add("Logics.LogicCellLine");
allowedReturnTypes.add("LogicTable");
allowedReturnTypes.add("LogicTree");
allowedReturnTypes.add("LZ78Factor[]");

export function isVisualTableType(e : TypeDocParameter | null){
    if(e == null){
        return false;
    }else{
        return e.type == "Logics.LogicCellLine" || e.type == "LogicTable";
    }
}
export function isVisualGraphType(e : TypeDocParameter | null){
    if(e == null){
        return false;
    }else{
        return e.type == "LogicTree";
    }
}


export function templateParse(template: libxmljs.Element): Map<string, string> {
    const map = new Map<string, string>();
    template.attrs().forEach((v)=>{
        const name = v.name().substr(5);
        const value = v.value();
        map.set(name, value);

    } )
    return map;
}

export function parseHtmlFragments(str: string): libxmljs.Node[] {
    const doc = libxmljs.parseHtmlFragment(`<root>${str}</root>`);
    return doc.root()!.childNodes();
}
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
export function getModuleFiles(dir: string): string[] {
    const r: string[] = [];
    const filenames = fs.readdirSync(dir);
    filenames.forEach((filename) => {
      const fullPath = path.join(dir, filename);
      const stats = fs.statSync(fullPath);
  
      if (stats.isFile()) {
        if (filename.length >= 4 && filename.substr(0, 4) == "_src") {
          r.push(fullPath);
        }
      }
    });
    return r;
  }
  