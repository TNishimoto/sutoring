import * as LogicGraphTable from "../graph_table"
import { LogicTable } from "logic_table"
import * as SuffixArray from "../array/suffix_array"

/**
 * This namespace provides functions for Burrows-Wheeler transform.
 */
function getCircularString(text: string, nth: number) {
    return text.substr(nth) + text.substr(0, nth);
}
function compare(text: string, ith: number, jth: number): number {
    const ithStr = getCircularString(text, ith);
    const jthStr = getCircularString(text, jth);
    if (ithStr == jthStr) {
        return ith - jth;
    } else {
        if (ithStr < jthStr) {
            return -1;
        } else {
            return 1;
        }
    }
}
export function construct(text: string) {
    const r = Array.from(Array(text.length).keys());
    r.sort((a, b) => {
        return compare(text, a, b);
    })
    return r.map((v) => {
        if (v == 0) {
            return text[text.length - 1]
        } else {
            return text[v - 1]
        }
    })
}
export function constructBWTTable(text: string, option: SuffixArray.SATableOption = { zeroBased: true, withSA: true, withLCP: false, withBWT: true }) {
    return SuffixArray.constructSATable(text, option);
}
