
import * as SuffixArray from "./suffix_array"
import { Logics, Objects } from "graph-table-svg"

function inverse(array: number[], zerobased : boolean): number[] {
    const invArr = new Array(array.length);
    array.forEach((v, i) =>{
        invArr[v- (zerobased ? 0 : 1) ] = i+ (zerobased ? 0 : 1);
    })
    return invArr;
}


export function construct(text: string, zerobased : boolean = true): number[] {
    const sa = SuffixArray.construct(text, zerobased);
    return inverse(sa, zerobased);
}
export function createISAArrayLine(text: string, zerobased : boolean = true,cellClass? : string | Objects.GOptions.GTextBoxCSS) : Logics.LogicCellLine{
    const arr = construct(text, zerobased);
    const name = "ISA"
    if(cellClass === undefined){
        return Logics.buildLogicCellLine(name, arr);
    }else{
        return Logics.buildLogicCellLine(name, arr, { class:cellClass});
    }
}