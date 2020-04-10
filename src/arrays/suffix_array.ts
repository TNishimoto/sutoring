
//import {LogicGraphTable} from "./graph_table"
//import { LogicTable, LogicCellLine, LogicCell } from "logic_index"
import { Logics, Objects, Common } from "graph-table-svg"
import * as LCPArray from "./lcp_array"
import * as BWT from "../permutations/bwt"

//import { toLogicCellLine, buildLogicTable } from "logic_index";
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

/**
 * [Markdown](https://marked.js.org/)
 * @param text 
 * @param zero_based 
 * @param cellClass
 * @returns aaaaaaaa
 */
export function createSuffixArrayTableLine(text: string, zero_based: boolean = true, cellClass : Objects.GOptions.CellAttributes = { style : { horizontalAnchor : "center"}}) : Logics.LogicCellLine{
    //const suffixClass : Objects.GOptions.CellAttributes = { style : { horizontalAnchor : "center"}};
    const arr = construct(text, zero_based);
    const name = "SA"
    return Logics.toLogicCellLine(name, arr, cellClass );
}
export function createSortedSuffixes(text : string) : string[] {
    const sa = construct(text);
    return sa.map((v) => text.substr(v));
}
export function createSortedSuffixesTableLine(text : string, cellClass : Objects.GOptions.CellAttributes = { style : { horizontalAnchor : "left"}, class : { horizontalAnchor : "right"}}) : Logics.LogicCellLine {
    const suffixes = createSortedSuffixes(text);
    const name = "Suffix";
    const p = Logics.toLogicCellLine(name, suffixes, cellClass);
    return p;
}

export function constructSATable(text: string, option: SATableOption = { zeroBased: true, withSA: true, withLCP: false, withBWT: false, withIndex: true }): Logics.LogicTable {
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

    const arrays: Logics.LogicCellLine[] = new Array(0);
    //arrays.push({ name: "Index", values: indexes });
    if(option.withIndex){
        arrays.push(Logics.getIndexArrayTableLine(text.length, option.zeroBased))
    }
    if (option.withSA) {
        arrays.push( createSuffixArrayTableLine(text, option.zeroBased) );
    }
    if (option.withLCP) {
        arrays.push( LCPArray.createLCPArrayLine(text) );
    }
    if (option.withBWT) {
        arrays.push( BWT.createBWTTableLine(text) );
    }

    arrays.push( createSortedSuffixesTableLine(text));


    const result = Logics.buildLogicTable(arrays, { isRowLines: false })
    console.log(createSuffixArrayTableLine(text, option.zeroBased)[2]);
    return result;
}



//}