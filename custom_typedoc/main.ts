//import path = require("path")
import fs = require('fs');
import libxmljs = require('libxmljs');

import { getModuleFiles, getModuleResolver } from './lib';
import * as typedoc_processor from './typedoc_processor';


//console.log(__dirname)

const directory = __dirname + "/../docs/typedoc/modules";
console.log(`Process: ${directory}`)
console.log(`File Count: ${getModuleFiles(directory).length}`)

getModuleFiles(directory);

getModuleFiles(directory).forEach((file) => {
  const text = fs.readFileSync(file, { encoding: "utf-8" });
  const xmlDoc = libxmljs.parseHtmlString(text);
  const moduleResolver = getModuleResolver(xmlDoc);
  if (moduleResolver != null) {
    console.log(`ModuleResolver-Path: ${moduleResolver.path}, name: ${moduleResolver.moduleName}`);

    //console.log(moduleResolver);

    typedoc_processor.processHeadTag(xmlDoc);

    const res = xmlDoc.find("//section[@class='tsd-panel tsd-member tsd-kind-function tsd-parent-kind-module']");
    res.forEach(element => {
      const item = new typedoc_processor.TypeDocFunctionTag(element);
      item.process();

    });
    fs.writeFileSync(file, xmlDoc.toString(), { encoding: "utf-8" });

  }else{
    console.log(`ModuleResolver: ${moduleResolver}`);
  }

})



