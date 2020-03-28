"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sutoring = require("../../dist/index");
const text = "abaababaabaababa$";
const result1 = Sutoring.Factorizations.LZ77WithSelfReference.factorize(text);
console.log(result1);
