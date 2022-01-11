"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const sutoring = require("../../dist/index");
const sutoring = require("../../../dist/index");
//const text = "abaababaabaababa$";
const text = "aba$";
const result1 = sutoring.Factorizations.LZ78.factorize(text);
const table = sutoring.Factorizations.LZ78.constructLZ78Table(text);
const trie = sutoring.Factorizations.LZ78.constructLZ78Trie(text);
//sutoring.Console.view(table, `LZ78 Table(${text})`);
sutoring.Console.view(trie, `LZ78 Trie(${text})`);
console.log(result1);
