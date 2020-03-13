#! /usr/bin/env node

const sutoring = require("../dist/index");
const replServer = require('repl').start('>>> ').context.sutoring = sutoring;
console.log("Hello world, sutoring.js!")