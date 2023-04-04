import * as sutoring from "../../dist/index"

const text = "ababbbabbabbbabbbbbaba";
const result = sutoring.Compressions.GrammarCompressions.RestrictedRecompression.compress(text);
const table = result.layerCompressionResult.toLogicTable();
sutoring.Console.view(table);

