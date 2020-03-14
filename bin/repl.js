#! /usr/bin/env node

console.log("Hello world, sutoring.js!")
console.log("This is a REPL of node.js.")
console.log("Sutoring.js modules are stored in variable 'sutoring'")

const sutoring = require("../dist/index");
const replServer = require('repl').start('>>> ').context.sutoring = sutoring;