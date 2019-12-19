
//import {LogicGraphTable} from "./graph_table"
import * as LogicGraphTable from "../graph_table"
import * as LCPArray from "./lcp_array"
import * as BWT from "../permutation/bwt"

import { LogicTable } from "logic_table"
import { GTextBoxCSS } from "object/g_options";
//namespace StrFunctions {
/**
 * This namespace provides functions for suffix array.
 */
export function construct(str: string, zero_based: boolean = true): number[] {
    const arr: number[] = new Array(str.length);
    for (let i = 0; i < str.length; i++) {
        arr[i] = i;
    }

    const func = function (item1: number, item2: number): number {
        for (let i = 0; i <= str.length; i++) {
            if (item1 + i >= str.length || item2 + i >= str.length) break;
            if (str.charAt(item1 + i) < str.charAt(item2 + i)) {
                return - 1;
            } else if (str.charAt(item1 + i) > str.charAt(item2 + i)) {
                return 1;
            }
        }
        if (item1 == item2) {
            return 0;
        } else {
            return item1 < item2 ? 1 : -1;
        }
    };
    arr.sort(func);

    if (zero_based) {
        return arr;
    } else {
        return arr.map((v) => v + 1);
    }
}
export type SATableOption = { zeroBased?: boolean, withSA?: boolean, withLCP?: boolean, withBWT?: boolean, withIndex?: boolean };
export function getSuffixArrayTableLine(text: string, zero_based: boolean = true, cellClass? : string | GTextBoxCSS) : LogicGraphTable.LogicTableLine{
    const arr = construct(text, zero_based);
    const name = "SA"
    const line = { name: name, values : arr, cellClass : cellClass };
    return line;
}
export function getSortedSuffixes(text : string) : string[] {
    const sa = construct(text);
    return sa.map((v) => text.substr(v));
}
export function getSortedSuffixesTableLine(text : string, cellClass : string | GTextBoxCSS = {horizontalAnchor: "left"}) : LogicGraphTable.LogicTableLine {
    const suffixes = getSortedSuffixes(text);
    const name = "Suffix";
    const line = { name: name, values : suffixes, cellClass: cellClass };
    return line;

}

export function constructSATable(text: string, option: SATableOption = { zeroBased: true, withSA: true, withLCP: false, withBWT: false, withIndex: true }): LogicTable {
    if (option.zeroBased == undefined) option.zeroBased = true;
    if (option.withSA == undefined) option.withSA = true;
    if (option.withLCP == undefined) option.withLCP = false;
    if (option.withBWT == undefined) option.withBWT = false;
    if (option.withIndex == undefined) option.withIndex = true;

    //const sa = construct(text);
    //const view_sa = option.zeroBased ? sa : sa.map((v) => v + 1);
    //const indexes = option.zeroBased ? sa.map((v, i) => i) : sa.map((v, i) => i+1);
    //const lcpArray = LCPArray.construct(text);
    //const bwt = BWT.construct(text).map((v) => v);

    const arrays: LogicGraphTable.LogicTableLine[] = new Array(0);
    //arrays.push({ name: "Index", values: indexes });
    if (option.withSA) {
        arrays.push( getSuffixArrayTableLine(text, option.zeroBased) );
    }
    if (option.withLCP) {
        arrays.push( LCPArray.getLCPArrayLine(text) );
    }
    if (option.withBWT) {
        arrays.push( BWT.getBWTTableLine(text) );
    }

    arrays.push( getSortedSuffixesTableLine(text));


    return LogicGraphTable.createLogicTable(arrays, { isRowLines: false })

}



//}