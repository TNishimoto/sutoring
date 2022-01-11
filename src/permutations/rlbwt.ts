import * as BWT from "./bwt"
import { Logics, Objects } from "graph-table-svg"
import * as SuffixArray from "../arrays/suffix_array"
import * as LCPArray from "../arrays/lcp_array"



/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 * @param isColored 
 * @param isRLBWT 
 * @param cellClass 
 */
export function createFArrayLine(text: string, isColored : boolean = false ,cellClass: string | Objects.GOptions.GTextBoxCSS = { horizontalAnchor: "center" } ): Logics.LogicCellLine {
    return BWT.createFArrayLine(text, isColored, true, cellClass);
}
export function createLArrayLine(text: string, isColored : boolean = false ,cellClass: string | Objects.GOptions.GTextBoxCSS = { horizontalAnchor: "center" } ): Logics.LogicCellLine {
    const line = BWT.createLArrayLine(text, isColored, true, cellClass);

    return line;


}

/**
 * 
 * @param text An input text. <template data-value="abaababaabaab$"></template>
 * @param option 
 */
 export function constructRLBWTTable(text: string, option: BWT.BWTOption = { zeroBased: true, withSA: true, withLCP: false, withBWT: true, 
    withMiddleSubstrings : true, coloredChar : true }) : Logics.LogicTable {


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
    arrays.push(createFArrayLine(text, option.coloredChar));
    if(option.withMiddleSubstrings){
        arrays.push(BWT.createSortedMiddleCircularStringsLine(text))
    }
    arrays.push(createLArrayLine(text, option.coloredChar));

    arrays.push(createSAStartingPositionArrayLine(text, option.zeroBased));
    arrays.push(createSAEndingPositionArrayLine(text, option.zeroBased));

    

    

    return Logics.buildLogicTable(arrays, { isRowLines: false })
}

export function createSAStartingPositionArrayLine(text: string, zero_based: boolean = true , cellClass : Objects.GOptions.CellAttributes = { style : { horizontalAnchor : "center"}} ): Logics.LogicCellLine {
    
    const arr = SuffixArray.construct(text, zero_based);
    const name = "SA+"

    const bwt = BWT.createLArray(text);

    const arr2 : string[] = arr.map((v,i) =>{
        if(i == 0 || bwt[i] != bwt[i-1]){
            return v.toString();
        }else{
            return "";
        }
    })

    return Logics.buildLogicCellLine(name, arr2, cellClass );
}
export function createSAEndingPositionArrayLine(text: string, zero_based: boolean = true , cellClass : Objects.GOptions.CellAttributes = { style : { horizontalAnchor : "center"}} ): Logics.LogicCellLine {
    
    const arr = SuffixArray.construct(text, zero_based);
    const name = "SA-"

    const bwt = BWT.createLArray(text);

    const arr2 : string[] = arr.map((v,i) =>{
        if(i == text.length || bwt[i] != bwt[i+1]){
            return v.toString();
        }else{
            return "";
        }
    })

    return Logics.buildLogicCellLine(name, arr2, cellClass );
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
export function createFArrayLine(text: string, isColored : boolean = false, cellClass: string | Objects.GOptions.GTextBoxCSS = { horizontalAnchor: "center" } ): Logics.LogicCellLine {
    const line = BWT.createFArrayLine(text, isColored, cellClass);
    const fruns = createFRunStartPositions(text);
    fruns.push(text.length);


    for(let i=0;i<fruns.length;i++){
        const begin = fruns[i];
        const end = fruns[i+1]-1;
        for(let j=begin;j < end;j++){
            line[j+1].bottomBorderOption.class = null;
        }

    }
    return line;
}


export function constructRLBWTTable(text: string, isColored : boolean, option: SuffixArray.SATableOption = { zeroBased: true, withSA: true, withLCP: false, withBWT: true }) {
    
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
    arrays.push(BWT.createSortedMiddleCircularStringsLine(text, isColored));
    arrays.push(createLArrayLine(text, isColored));

    return Logics.buildLogicTable(arrays, { isRowLines: false })
    
}
*/