//import path = require("path")
import fs = require('fs');
import libxmljs = require('libxmljs');

import { getModuleFiles, getModuleResolver } from './lib';
import * as typedoc_processor from './typedoc_processor';




getModuleFiles("../docs/typedoc/modules");
const directory = "../docs/typedoc/modules";

getModuleFiles(directory).forEach((file) => {
  const text = fs.readFileSync(file, { encoding: "utf-8" });
  const xmlDoc = libxmljs.parseHtmlString(text);
  const moduleResolver = getModuleResolver(xmlDoc);
  if (moduleResolver != null) {
    console.log(moduleResolver);

    typedoc_processor.processHeadTag(xmlDoc);

    const res = xmlDoc.find("//section[@class='tsd-panel tsd-member tsd-kind-function tsd-parent-kind-module']");
    res.forEach(element => {
      const item = new typedoc_processor.TypeDocFunctionTag(element);
      item.process();

    });
    fs.writeFileSync(file, xmlDoc.toString(), { encoding: "utf-8" });

  }

})



