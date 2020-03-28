"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const sutoring = require("../../dist/index");
const Sutoring = require("../../dist/index");
const text = "abaababaabaababa$";
const result1 = Sutoring.Factorizations.LZ78.factorize(text);
const table = Sutoring.Factorizations.LZ78.constructLZ78Table(text);
Sutoring.Console.view(table, `LZ78 Table(${text})`);
console.log(result1);
