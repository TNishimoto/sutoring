import * as sutoring from "../../dist/index"

const result = sutoring.Compressions.GrammarCompressions.Recompression.compress("ababbbabbabbbabbbbbaba");
const table = result.layerCompressionResult.toLogicTable();
sutoring.Console.view(table);

