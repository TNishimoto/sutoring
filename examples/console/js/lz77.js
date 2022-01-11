"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sutoring = require("../../dist/index");
const text = "abaababaabaababa$";
const result1 = sutoring.Factorizations.LZ77WithSelfReference.factorize(text);
console.log(result1);
