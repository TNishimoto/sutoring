import * as BWT from "./bwt"
import { LogicTable, LogicCell, LogicTSpan, LogicText, getIndexArrayTableLine, LogicCellLine, buildLogicTable } from "logic_index"
import * as SuffixArray from "../array/suffix_array"
import * as LCPArray from "../array/lcp_array"
import { GTextBoxCSS } from "object/g_options";

type RLEFactor = { char : string, length : number}

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

export function construct(text: string) : RLEFactor[] {
    const bwt = BWT.construct(text);
    return runLengthEncode(bwt);
}
export function createLRunStartPositions(text: string) : number[] {
    const bwt = BWT.createLArray(text);
    const r : number[] = new Array();
    r.push(0);
    for(let i=1;i<text.length;i++){
        if(bwt[i] != bwt[i-1]){
            r.push(i);
        }
    }
    return r;    
}
export function createFRunStartPositions(text: string){
    const bwt = BWT.createLArray(text);
    const lruns = createLRunStartPositions(text);
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

export function createLArrayLine(text: string, isColored : boolean = false, cellClass: string | GTextBoxCSS = { horizontalAnchor: "center" } ): LogicCellLine {
    const line = BWT.createLArrayLine(text, isColored, cellClass);
    const lruns = createLRunStartPositions(text);
    lruns.push(text.length);

    for(let i=0;i<lruns.length;i++){
        const begin = lruns[i];
        const end = lruns[i+1]-1;
        for(let j=begin;j < end;j++){
            line[j+1].bottomBorderClass = null;
        }

    }

    return line;
}
export function createFArrayLine(text: string, isColored : boolean = false, cellClass: string | GTextBoxCSS = { horizontalAnchor: "center" } ): LogicCellLine {
    const line = BWT.createFArrayLine(text, isColored, cellClass);
    const fruns = createFRunStartPositions(text);
    fruns.push(text.length);


    for(let i=0;i<fruns.length;i++){
        const begin = fruns[i];
        const end = fruns[i+1]-1;
        for(let j=begin;j < end;j++){
            line[j+1].bottomBorderClass = null;
        }

    }
    return line;
}


export function constructRLBWTTable(text: string, isColored : boolean, option: SuffixArray.SATableOption = { zeroBased: true, withSA: true, withLCP: false, withBWT: true }) {
    
    if (option.zeroBased == undefined) option.zeroBased = true;
    if (option.withSA == undefined) option.withSA = true;
    if (option.withLCP == undefined) option.withLCP = false;
    if (option.withIndex == undefined) option.withIndex = true;

    const arrays: LogicCellLine[] = new Array(0);
    //arrays.push({ name: "Index", values: indexes });
    if(option.withIndex){
        arrays.push(getIndexArrayTableLine(text.length, option.zeroBased));
    }
    if (option.withSA) {
        arrays.push( SuffixArray.createSuffixArrayTableLine(text, option.zeroBased) );
    }
    if (option.withLCP) {
        arrays.push( LCPArray.createLCPArrayLine(text) );
    }

    arrays.push(createFArrayLine(text, isColored));
    arrays.push(BWT.createSortedMiddleCircularStringsLine(text, isColored));
    arrays.push(createLArrayLine(text, isColored));

    return buildLogicTable(arrays, { isRowLines: false })
    
}