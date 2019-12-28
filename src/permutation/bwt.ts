//import * as LogicGraphTable from "../graph_table"
import { LogicTable, LogicTableLine, createLogicTable, LogicCell, LogicTSpan, LogicText } from "logic_index"
import * as SuffixArray from "../array/suffix_array"
import { GTextBoxCSS } from "object/g_options";
/**
 * This namespace provides functions for Burrows-Wheeler transform.
 */
function getCircularString(text: string, nth: number): string {
    return text.substr(nth) + text.substr(0, nth);
}
function getCircularStrings(text: string): string[] {
    const r = Array.from(Array(text.length).keys()).map((i) => getCircularString(text, i));
    return r;
}
function getCircularSuffixArray(text: string): number[] {
    const r = Array.from(Array(text.length).keys());
    r.sort((a, b) => {
        return compare(text, a, b);
    })
    return r;
}
function getSortedCircularStrings(text: string): string[] {
    const csa = getCircularSuffixArray(text);
    return csa.map((i) => getCircularString(text, i));
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
export function getBWTIndexes(text: string): number[] {
    const csa = getCircularSuffixArray(text);
    return csa.map((v) => {
        if (v == 0) {
            return text.length - 1
        } else {
            return v - 1;
        }
    });
}
export function construct(text: string): string {
    return getBWTIndexes(text).map((v) => text[v]).join();
}
export function getBWTTableLine(text: string, cellClass?: string | GTextBoxCSS): LogicTableLine {
    const bwt = construct(text);
    const arr = Array.from(Array(text.length).keys()).map((i) => bwt[i]);

    const name = "BWT"
    const line = { name: name, values: arr, cellClass: cellClass };
    return line;
}
export function getFArray(text: string): string[] {
    return getSortedCircularStrings(text).map((v) => v[0]);
}
export function getLArray(text: string): string[] {
    return getSortedCircularStrings(text).map((v) => v[v.length - 1]);
}
export function getSortedMiddleCircularStrings(text: string): string[] {
    return getSortedCircularStrings(text).map((v) => v.substr(1, v.length - 2));
}
function getRank(text : string, ith : number) : number {
    const c = text[ith];
    let rank = 0;
    for(let i=0;i<ith;i++){
        if(c == text[i]) rank++;
    }
    return rank;
}
const colors = ["black", "red", "orange", "blue", "green", "purple"];

export function getFArrayLine(text: string, isColored : boolean = false, cellClass: string | GTextBoxCSS = { horizontalAnchor: "center" } ): LogicTableLine {
    const suffixes = getFArray(text);
    const name = "F";
    if(isColored){
        const csa = getCircularSuffixArray(text);
        const cells = csa.map((v,i) =>{
            const rank = getRank(text, v);
            const cell = new LogicCell();
            cell.text.textContent = suffixes[i];
            const color = colors[rank % colors.length];
            cell.text.style = {fill:color };
            return cell;
        })
        const line = { name: name, values: cells, cellClass: cellClass };
        return line;    

    }else{
        const line = { name: name, values: suffixes, cellClass: cellClass };
        return line;    
    }
}
export function getLArrayLine(text: string, isColored : boolean = false, cellClass: string | GTextBoxCSS = { horizontalAnchor: "center" } ): LogicTableLine {
    const suffixes = getLArray(text);
    const name = "L";

    if(isColored){
        const csa = getBWTIndexes(text);
        const cells = csa.map((v,i) =>{
            const rank = getRank(text, v);
            const cell = new LogicCell();
            cell.text.textContent = suffixes[i];
            const color = colors[rank % colors.length];
            cell.text.style = {fill:color };
            return cell;
        })
        const line = { name: name, values: cells, cellClass: cellClass };
        return line;    

    }else{
        const line = { name: name, values: suffixes, cellClass: cellClass };
        return line;    
    }

}
export function getSortedMiddleCircularStringsLine(text: string, isColored : boolean = false, cellClass: string | GTextBoxCSS = { horizontalAnchor: "center" } ): LogicTableLine {
    const suffixes = getSortedMiddleCircularStrings(text);
    const name = "";

    if(isColored){
        const csa = getCircularSuffixArray(text);
        const cells = csa.map((v,i) =>{
            const cell = new LogicCell();
            const spans : LogicTSpan[] = new Array();
            for(let i=1;i<text.length-1;i++){
                const p = (v + i) % text.length;
                const rank = getRank(text, p);
                const span = new LogicTSpan();
                span.textContent = text[p];
                const color = colors[rank % colors.length];
                span.style = {fill:color };
                spans.push(span);                
            }
            cell.text = new LogicText(spans);
            return cell;
        })
        const line = { name: name, values: cells, cellClass: cellClass };
        return line;    

    }else{
        const line = { name: name, values: suffixes, cellClass: cellClass };
        return line;    
    }

}


export function constructBWTTable(text: string, option: SuffixArray.SATableOption = { zeroBased: true, withSA: true, withLCP: false, withBWT: true }) {
    return SuffixArray.constructSATable(text, option);
}

export function constructBWTTable2(text: string, isColored : boolean, option: SuffixArray.SATableOption = { zeroBased: true, withSA: true, withLCP: false, withBWT: true }) {
    const f = getFArrayLine(text, isColored);
    const m = getSortedMiddleCircularStringsLine(text, isColored);
    const l = getLArrayLine(text, isColored);

    return createLogicTable([f, m, l], { isRowLines: false })
}
