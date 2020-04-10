import { Logics, Objects, Common } from "graph-table-svg"
import * as SuffixArray from "../arrays/suffix_array"
import * as LCPArray from "../arrays/lcp_array"

/**
 * This namespace provides functions for Burrows-Wheeler transform.
 */
function createCircularString(text: string, nth: number): string {
    return text.substr(nth) + text.substr(0, nth);
}
function createCircularStrings(text: string): string[] {
    const r = Array.from(Array(text.length).keys()).map((i) => createCircularString(text, i));
    return r;
}
export function createCircularSuffixArray(text: string, zeroBased : boolean = true): number[] {
    const r = Array.from(Array(text.length).keys());
    r.sort((a, b) => {
        return compare(text, a, b);
    })

    if(zeroBased){
        return r;
    }else{
        return r.map((v) => v+1);
    }
}
function createSortedCircularStrings(text: string): string[] {
    const csa = createCircularSuffixArray(text);
    return csa.map((i) => createCircularString(text, i));
}


function compare(text: string, ith: number, jth: number): number {
    const ithStr = createCircularString(text, ith);
    const jthStr = createCircularString(text, jth);
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
export function createBWTIndexes(text: string, zeroBased : boolean = true): number[] {
    const csa = createCircularSuffixArray(text);
    return csa.map((v) => {
        if (v == 0) {
            return text.length - 1 + (zeroBased ? 0 : 1)
        } else {
            return v - 1 + (zeroBased ? 0 : 1);
        }
    });
}
export function construct(text: string): string {
    return createBWTIndexes(text).map((v) => text[v]).join("");
}
export function createBWTTableLine(text: string, cellClass: string | Objects.GOptions.GTextBoxCSS  = Common.DefaultClassNames.defaultCellClass): Logics.LogicCellLine {
    const bwt = construct(text);
    const arr = Array.from(Array(text.length).keys()).map((i) => bwt[i]);

    const name = "BWT"
    return Logics.toLogicCellLine(name, arr, {class:cellClass});
}
export function createFArray(text: string): string[] {
    return createSortedCircularStrings(text).map((v) => v[0]);
}
export function createLArray(text: string): string[] {
    return createSortedCircularStrings(text).map((v) => v[v.length - 1]);
}
export function createSortedMiddleCircularStrings(text: string): string[] {
    return createSortedCircularStrings(text).map((v) => v.substr(1, v.length - 2));
}
function rank(text : string, ith : number) : number {
    const c = text[ith];
    let _rank = 0;
    for(let i=0;i<ith;i++){
        if(c == text[i]) _rank++;
    }
    return _rank;
}
const bwtColors = ["black", "red", "orange", "blue", "green", "purple", "gray", "slateblue", "saddlebrown", "olive", "aqua"];



export function createFArrayLine(text: string, isColored : boolean = false, cellClass: string | Objects.GOptions.GTextBoxCSS = { horizontalAnchor: "center" } ): Logics.LogicCellLine {
    const titleCell = new Logics.LogicCell();
    titleCell.text.textContent = "F";
    titleCell.groupOption.class = cellClass;

    const suffixes = createFArray(text);
    //const name = "F";
    const csa = createCircularSuffixArray(text);
    const cells = csa.map((v,i) =>{
        const _rank = rank(text, v);
        const cell = new Logics.LogicCell();
        cell.groupOption.class = cellClass;
        cell.text.textContent = suffixes[i];
        if(isColored){
            const color = bwtColors[_rank % bwtColors.length];
            cell.text.style = {fill:color };    
        }
        return cell;
    })
    return [titleCell].concat(cells);

}
export function createLArrayLine(text: string, isColored : boolean = false, cellClass: string | Objects.GOptions.GTextBoxCSS = { horizontalAnchor: "center" } ): Logics.LogicCellLine {
    const titleCell = new Logics.LogicCell();
    titleCell.text.textContent = "L";
    titleCell.groupOption.class = cellClass;

    const suffixes = createLArray(text);

    const csa = createBWTIndexes(text);
    const cells = csa.map((v,i) =>{
        const _rank = rank(text, v);
        const cell = new Logics.LogicCell();
        cell.groupOption.class = cellClass;
        cell.text.textContent = suffixes[i];
        if(isColored){
            const color = bwtColors[_rank % bwtColors.length];
            cell.text.style = {fill:color };    
        }
        return cell;
    })    
    return [titleCell].concat(cells);


}
export function createSortedMiddleCircularStringsLine(text: string, isColored : boolean = false, cellClass: string | Objects.GOptions.GTextBoxCSS = { horizontalAnchor: "center" } ): Logics.LogicCellLine {
    //const r : LogicCellLine = new Array();
    const titleCell = new Logics.LogicCell();
    titleCell.text.textContent = "";
    titleCell.groupOption.class = cellClass;


    const suffixes = createSortedMiddleCircularStrings(text);

    const csa = createCircularSuffixArray(text);
    const cells = csa.map((v,i) =>{
        const cell = new Logics.LogicCell();
        if(isColored){
            const spans : Logics.LogicTSpan[] = new Array();
            for(let i=1;i<text.length-1;i++){
                const p = (v + i) % text.length;
                const _rank = rank(text, p);
                const span = new Logics.LogicTSpan();
                span.textContent = text[p];
                const color = bwtColors[_rank % bwtColors.length];
                span.style = {fill:color };
                spans.push(span);                
            }
            cell.text = new Logics.LogicText(spans);    
        }else{
            cell.text.textContent = suffixes[i];
            cell.groupOption.class = cellClass;
        }
        return cell;
    })
    return [titleCell].concat(cells);


}


export function constructBWTTable(text: string, option: SuffixArray.SATableOption = { zeroBased: true, withSA: true, withLCP: false, withBWT: true }) {
    return SuffixArray.constructSATable(text, option);
}

export function constructBWTTable2(text: string, isColored : boolean, option: SuffixArray.SATableOption = { zeroBased: true, withSA: true, withLCP: false, withBWT: true }) {
    if (option.zeroBased == undefined) option.zeroBased = true;
    if (option.withSA == undefined) option.withSA = true;
    if (option.withLCP == undefined) option.withLCP = false;
    if (option.withIndex == undefined) option.withIndex = true;

    const arrays: Logics.LogicCellLine[] = new Array(0);
    //arrays.push({ name: "Index", values: indexes });
    
    if(option.withIndex){
        arrays.push(Logics.getIndexArrayTableLine(text.length, option.zeroBased));
    }
    if (option.withSA) {
        arrays.push( SuffixArray.createSuffixArrayTableLine(text, option.zeroBased) );
    }
    if (option.withLCP) {
        arrays.push( LCPArray.createLCPArrayLine(text) );
    }
    

    arrays.push(createFArrayLine(text, isColored));
    arrays.push(createSortedMiddleCircularStringsLine(text, isColored));
    arrays.push(createLArrayLine(text, isColored));

    return Logics.buildLogicTable(arrays, { isRowLines: false })
}
