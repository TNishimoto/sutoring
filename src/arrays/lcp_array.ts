/**
 * This namespace provides functions for LCP array.
 * <template data-path="sutoring.Arrays" data-module="LCPArray"></template>
 * @packageDocumentation
 */


import * as SuffixArray from "./suffix_array"
import { Logics, Objects } from "graph-table-svg"
import { lcp } from "../string_functions"

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
        return Logics.buildLogicCellLine(name, arr);
    }else{
        return Logics.buildLogicCellLine(name, arr, { class:cellClass});
    }
}

export function constructLCPTable(text: string, option: SuffixArray.SATableOption = { zeroBased: true, withSA: true, withLCP: true, withBWT: false }) {
    return SuffixArray.constructSATable(text, option);
}
