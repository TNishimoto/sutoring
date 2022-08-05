import * as sutoring from "sutoring"

const text = "abaababaabaababa$";
const result = sutoring.Factorizations.LZ77WithSelfReference.factorize(text);
console.log(result);