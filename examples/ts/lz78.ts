//const sutoring = require("../../dist/index");
import * as Sutoring from "../../dist/index"

const text = "abaababaabaababa$";
const result1 = Sutoring.Factorizations.LZ78.factorize(text);
const table = Sutoring.Factorizations.LZ78.constructLZ78Table(text);
Sutoring.Console.view(table, `LZ78 Table(${text})`);

console.log(result1);