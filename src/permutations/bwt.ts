/**
 * This namespace provides functions for Burrows-Wheeler transform.
 * <template data-path="sutoring.Permutations" data-module="BWT"></template>
 * @packageDocumentation
 */
import { Logics, Objects, Common } from "graph-table-svg"
import * as SuffixArray from "../arrays/suffix_array"
import * as LCPArray from "../arrays/lcp_array"

export type BWTOption = SuffixArray.SATableOption & { 
    withMiddleSubstrings? : boolean 
    isRLBWT? : boolean
    coloredChar? : boolean
}

function createCircularString(text: string, nth: number): string {
    return text.substr(nth) + text.substr(0, nth);
}
function createCircularStrings(text: string): string[] {
    const r = Array.from(Array(text.length).keys()).map((i) => createCircularString(text, i));
    return r;
}

/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 * @param zeroBased 
 */
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
/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 */
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
/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 * @param zeroBased 
 */
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
/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 */
export function construct(text: string): string {
    return createBWTIndexes(text).map((v) => text[v]).join("");
}
/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 * @param cellClass 
 */
export function createBWTTableLine(text: string, cellClass: string | Objects.GOptions.GTextBoxCSS  = Common.DefaultClassNames.defaultCellClass): Logics.LogicCellLine {
    const bwt = construct(text);
    const arr = Array.from(Array(text.length).keys()).map((i) => bwt[i]);

    const name = "BWT"
    return Logics.toLogicCellLine(name, arr, {class:cellClass});
}
/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 */
export function createFArray(text: string): string[] {
    return createSortedCircularStrings(text).map((v) => v[0]);
}
/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 */
export function createLArray(text: string): string[] {
    return createSortedCircularStrings(text).map((v) => v[v.length - 1]);
}
/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 */
export function createSortedMiddleCircularStrings(text: string): string[] {
    return createSortedCircularStrings(text).map((v) => v.substr(1, v.length - 2));
}
export function rank(text : string, ith : number) : number {
    const c = text[ith];
    let _rank = 0;
    for(let i=0;i<ith;i++){
        if(c == text[i]) _rank++;
    }
    return _rank;
}
export const bwtColors = ["black", "red", "orange", "blue", "green", "purple", "gray", "slateblue", "saddlebrown", "olive", "aqua"];


/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 * @param isColored 
 * @param isRLBWT 
 * @param cellClass 
 */
export function createFArrayLine(text: string, isColored : boolean = false, isRLBWT : boolean = false ,cellClass: string | Objects.GOptions.GTextBoxCSS = { horizontalAnchor: "center" } ): Logics.LogicCellLine {
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

    if(isRLBWT){
        const fruns = createFRunStartPositions(text);
        fruns.push(text.length);
        for(let i=0;i<fruns.length;i++){
            const begin = fruns[i];
            const end = fruns[i+1]-1;
            for(let j=begin;j < end;j++){
                cells[j].bottomBorderOption.class = null;
            }
    
        }    
    }


    return [titleCell].concat(cells);

}

/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 * @param isColored 
 * @param isRLBWT 
 * @param cellClass 
 */
export function createLArrayLine(text: string, isColored : boolean = false, isRLBWT : boolean = false ,cellClass: string | Objects.GOptions.GTextBoxCSS = { horizontalAnchor: "center" } ): Logics.LogicCellLine {
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

    if(isRLBWT){
        const lruns = createLRunStartingPositions(text);
        lruns.push(text.length);

        for(let i=0;i<lruns.length;i++){
            const begin = lruns[i];
            const end = lruns[i+1]-1;
            for(let j=begin;j < end;j++){
                cells[j].bottomBorderOption.class = null;
            }
    
        }    

    }

    return [titleCell].concat(cells);


}
/*
export function createLArrayLine(text: string, isColored : boolean = false, cellClass: string | Objects.GOptions.GTextBoxCSS = { horizontalAnchor: "center" } ): Logics.LogicCellLine {
    const line = BWT.createLArrayLine(text, isColored, cellClass);
    const lruns = createLRunStartingPositions(text);
    lruns.push(text.length);

    for(let i=0;i<lruns.length;i++){
        const begin = lruns[i];
        const end = lruns[i+1]-1;
        for(let j=begin;j < end;j++){
            line[j+1].bottomBorderOption.class = null;
        }

    }

    return line;
}
*/
/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 * @param isColored 
 * @param cellClass 
 */
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

/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 * @param option 
 */
export function constructBWTTable(text: string, option: SuffixArray.SATableOption = { zeroBased: true, withSA: true, withLCP: false, withBWT: true }) {
    return SuffixArray.constructSATable(text, option);
}

/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 * @param option 
 */
export function constructBWTTable2(text: string, option: BWTOption = { zeroBased: true, withSA: true, withLCP: false, withBWT: true, 
    withMiddleSubstrings : true, isRLBWT : false, coloredChar : true }) : Logics.LogicTable {
    if (option.zeroBased == undefined) option.zeroBased = true;
    if (option.withSA == undefined) option.withSA = true;
    if (option.withLCP == undefined) option.withLCP = false;
    if (option.withIndex == undefined) option.withIndex = true;
    if (option.withMiddleSubstrings == undefined) option.withMiddleSubstrings = true;
    if (option.isRLBWT == undefined) option.isRLBWT = false;
    if (option.coloredChar == undefined) option.coloredChar = true;


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
    

    arrays.push(createFArrayLine(text, option.coloredChar, option.isRLBWT));

    if(option.withMiddleSubstrings){
        arrays.push(createSortedMiddleCircularStringsLine(text, option.coloredChar));
    }
    arrays.push(createLArrayLine(text, option.coloredChar, option.isRLBWT));

    return Logics.buildLogicTable(arrays, { isRowLines: false })
}


type RLEFactor = { char : string, length : number}

/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 */
export function runLengthEncode(text: string) : RLEFactor[]{
    if(text.length == 0){
        return new Array();
    }else{
        const r = new Array();
        let m : number= 1;
        let c : string = text[0];
    
        for(let i=1;i<text.length;i++){
            if(text[i] != c){
                r.push({ char : c, length : m});
                m = 1;
                c = text[i];
            }else{
                m++
            }
        }
        if(m >= 1){
            r.push({ char : c, length : m});
        }
        return r;
    
    }
}

/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 */
export function constructRLBWT(text: string) : RLEFactor[] {
    const bwt = construct(text);
    return runLengthEncode(bwt);
}

/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 */
export function createLRunStartingPositions(text: string) : number[] {
    const bwt = createLArray(text);
    const r : number[] = new Array();
    r.push(0);
    for(let i=1;i<text.length;i++){
        if(bwt[i] != bwt[i-1]){
            r.push(i);
        }
    }
    return r;    
}
/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 */
export function createLRunEndingPositions(text: string) : number[] {
    const lruns = createLRunStartingPositions(text);
    const r : number[] = new Array();
    for(let i=1;i<lruns.length;i++){
        r.push(lruns[i]-1);
    }
    r.push(text.length-1);

    return r;    
}
/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 */
export function createFRunStartPositions(text: string) : number[]{
    const bwt = createLArray(text);
    const lruns = createLRunStartingPositions(text);
    const infos = lruns.map((v, i)=>{
        if(i + 1 == lruns.length){
            return [v, bwt.length - lruns[i]];
        }else{
            const width = lruns[i+1] - lruns[i];
            return [v, width];
        }
    })
    infos.sort((a, b) =>{
        if(bwt[a[0]] != bwt[b[0]]){
            return bwt[a[0]] < bwt[b[0]] ? -1 : 1;
        }else{
            return a[0] < b[0] ? -1 : 1;
        }
    })
    const r = new Array(0);
    r.push(0);
    for(let i=0;i<infos.length;i++){
        const prev = r[r.length-1];
        r.push(infos[i][1] + prev);
    }
    return r;
}
