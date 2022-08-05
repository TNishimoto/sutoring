//const sutoring = require("../../dist/index");
import * as sutoring from "sutoring"

const text = "aba$";
const result = sutoring.Factorizations.LZ78.factorize(text);
//const table = sutoring.Factorizations.LZ78.constructLZ78Table(text);
const trie = sutoring.Factorizations.LZ78.constructLZ78Trie(text);
sutoring.Console.view(trie, `LZ78 Trie(${text})`);
console.log(result);