import * as sutoring from "sutoring"


const text = "abaab$";

const table = sutoring.Arrays.SuffixArray.constructSATable(text, {
    zeroBased: false,
    withBWT: false,
    withLCP: false,
    withSA: true,
    withIndex: false
});
sutoring.Console.table(table);
