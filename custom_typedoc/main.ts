//import { Logics, Objects } from "xmldom"
import path = require("path")
import fs = require('fs');
//const jsdom = require('jsdom');
//const libxmljs = require("libxmljs");
import libxmljs = require('libxmljs');

import * as typedoc_processor from './typedoc_processor';
//const { JSDOM } = jsdom;

function getModuleFiles(dir : string) : string[] {
    const r : string[] = [];
    const filenames = fs.readdirSync(dir);
    filenames.forEach((filename) => {
      const fullPath = path.join(dir, filename);
      const stats = fs.statSync(fullPath);
      
      if (stats.isFile()) {
          if(filename.length >= 4 && filename.substr(0, 4) == "_src"){
            r.push(fullPath);
          }
      } 
    });
    return r;
  }
  

getModuleFiles("../docs/typedoc/modules");
const directory = "../docs/typedoc/modules";
//const inputPath = "../docs/typedoc/modules/_src_sequences_thue_morse_sequence_.html"

getModuleFiles(directory).forEach((file) =>{
    const text = fs.readFileSync(file, { encoding: "utf-8" });
    const xmlDoc = libxmljs.parseHtmlString(text);
    const moduleResolver = typedoc_processor.getModuleResolver(xmlDoc);
    console.log(moduleResolver);
    if (moduleResolver != null) {
        typedoc_processor.processHeadTag(xmlDoc);
    
        const res = xmlDoc.find("//section[@class='tsd-panel tsd-member tsd-kind-function tsd-parent-kind-module']");
        res.forEach(element => {
            const item = new typedoc_processor.TypeDocFunctionTag(element);
            item.process();

        });
        fs.writeFileSync(file, xmlDoc.toString(), { encoding: "utf-8" });
    
    }
    
})



