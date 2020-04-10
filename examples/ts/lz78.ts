//const sutoring = require("../../dist/index");
import * as sutoring from "../../dist/index"

const text = "abaababaabaababa$";
const result1 = sutoring.Factorizations.LZ78.factorize(text);
const table = sutoring.Factorizations.LZ78.constructLZ78Table(text);
sutoring.Console.view(table, `LZ78 Table(${text})`);

console.log(result1);