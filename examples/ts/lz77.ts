import * as Sutoring from "../../dist/index"

const text = "abaababaabaababa$";

const result1 = Sutoring.Factorizations.LZ77WithSelfReference.factorize(text);

console.log(result1);