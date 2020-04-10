"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sutoring = require("../../dist/index");
const text = "abaab$";
/*
const text = document.getElementById("text").value;
const zeroBasedIndexFlag = document.getElementById("zeroBased").checked;
const withBWTFlag = document.getElementById("withBWT").checked;
const withSAFlag = document.getElementById("withSA").checked;
const withLCPFlag = document.getElementById("withLCP").checked;
const withIndexFlag = document.getElementById("withIndex").checked;
*/
const table = Sutoring.Arrays.SuffixArray.constructSATable(text, {
    zeroBased: false,
    withBWT: false,
    withLCP: false,
    withSA: true,
    withIndex: false
});
Sutoring.Console.table(table);
