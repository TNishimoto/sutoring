//import * as LogicGraphTable from "../graph_table"
import * as SuffixArray from "./suffix_array"
//import { GTextBoxCSS } from "g_options";
import { Logics, Objects } from "graph-table-svg"
/**
 * This namespace provides functions for longest common prefix array.
 */
export function lcp(text1: string, text2: string): number {
    const max = text1.length < text2.length ? text2.length : text1.length;
    for (let i = 0; i < max; i++) {
        if (text1[i] != text2[i]) return i;
    }
    return max;
}
export function construct(text: string): number[] {
    const sa = SuffixArray.construct(text);
    const lcpArray = sa.map((_, i) => {
        if (i == 0) {
            return 0;
        } else {
            return lcp(text.substr(sa[i]), text.substr(sa[i - 1]))
        }
    })
    return lcpArray;
}
export function createLCPArrayLine(text: string, cellClass? : string | Objects.GOptions.GTextBoxCSS) : Logics.LogicCellLine{
    const arr = construct(text);
    const name = "LCP"
    if(cellClass === undefined){
        return Logics.toLogicCellLine(name, arr);
    }else{
        return Logics.toLogicCellLine(name, arr, { class:cellClass});
    }
}

export function constructLCPTable(text: string, option: SuffixArray.SATableOption = { zeroBased: true, withSA: true, withLCP: true, withBWT: false }) {
    return SuffixArray.constructSATable(text, option);
}
