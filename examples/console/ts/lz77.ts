import * as sutoring from "../../../dist/index"

const text = "abaababaabaababa$";

const result1 = sutoring.Factorizations.LZ77WithSelfReference.factorize(text);

console.log(result1);