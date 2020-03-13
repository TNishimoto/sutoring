const sutoring = require("../dist/index");

const text = "abaababaabaababa$";

const result1 = sutoring.LZ77WithSelfReference.factorize(text);

//const table = sutoring.LZ78.constructLZ78Table(text);
//sutoring.Console.table(table, `LZ78 Table(${text})`);


console.log(result1);