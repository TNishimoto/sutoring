import { lce } from "../string_functions"
import { Logics, Objects } from "graph-table-svg"

export function lpf(text: string, i : number): number {
    let max = 0;
    for(let j=0;j<i;j++){
        const lcev = lce(text, i, j);
        if(lcev > max){
            max = lcev;
        }
    }
    return max;
}
export function construct(text: string): number[] {
    const lpfArray = new Array(text.length);
    for(let i=0;i<text.length;i++){
        lpfArray[i] = lpf(text, i);
    }
    return lpfArray;
}
export function createLPFArrayLine(text: string, cellClass? : string | Objects.GOptions.GTextBoxCSS) : Logics.LogicCellLine{
    const arr = construct(text);
    const name = "LPF"
    if(cellClass === undefined){
        return Logics.toLogicCellLine(name, arr);
    }else{
        return Logics.toLogicCellLine(name, arr, { class:cellClass});
    }
}