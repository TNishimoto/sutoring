import * as BWT from "./bwt"
import * as LCP from "../arrays/lcp_array"
import { Logics, Objects, Common } from "graph-table-svg"

import * as RLBWT from "./rlbwt"


function createSortedLRunStartingPositionsBySuffixArray(text : string) : number[]{
    const lruns = BWT.createLRunStartingPositions(text)
    const sa = BWT.createCircularSuffixArray(text);
    lruns.sort((a, b)=>{
        return sa[a] < sa[b] ? -1 :1;
    })
    return lruns;
}
function createSortedLRunEndingPositionsBySuffixArray(text : string) : number[]{
    const lruns = BWT.createLRunEndingPositions(text)
    const sa = BWT.createCircularSuffixArray(text);
    lruns.sort((a, b)=>{
        return sa[a] < sa[b] ? -1 :1;
    })
    return lruns;
}


export function createSSAForEndingPositions(text : string) : number[]{
    const sortedLRuns = createSortedLRunEndingPositionsBySuffixArray(text);
    const sa = BWT.createCircularSuffixArray(text);
    return sortedLRuns.map((v) => sa[v]);
}

export function toArray(arr : number[]) : (number | null)[]{
    const r : (number | null)[] = new Array(0);
    arr.forEach((v) =>{
        while(r.length < v){
            r.push(null);
        }
        r.push(v);
    })
    return r;
}
export function toLogicTableLine(name : string, arr : (number | null)[]) : Logics.LogicTable{
    const arr2 = arr.map((v) => v == null ? "" : v);
    const p = Logics.buildLogicCellLine(name, arr2);

    
    return Logics.buildLogicTable([p], { isRowLines: true });
}


export function createSSAForStartingPositions(text : string) : number[]{
    const sortedLRuns = createSortedLRunStartingPositionsBySuffixArray(text);
    const sa = BWT.createCircularSuffixArray(text);
    return sortedLRuns.map((v) => sa[v]);
}
export function createSLCPArrayForEndingPositions(text : string) : number[]{
    const sortedLRuns = createSortedLRunEndingPositionsBySuffixArray(text);
    const lcpArray = LCP.construct(text);
    return sortedLRuns.map((v) => {
        if(v == text.length-1){
            return lcpArray[0]
        }else{
            return lcpArray[v+1]
        }
    });
}


export function createDSAForEndingPositions(text : string) : number[]{
    const sortedLRuns = createSortedLRunEndingPositionsBySuffixArray(text);
    const sa = BWT.createCircularSuffixArray(text);
    return sortedLRuns.map((v) => {
        if(v == text.length-1){
            return sa[v] - sa[0]
        }else{
            return sa[v] - sa[v+1];
        }
    });
}
export function createDSAForStartingPositions(text : string) : number[]{
    const sortedLRuns = createSortedLRunStartingPositionsBySuffixArray(text);
    const sa = BWT.createCircularSuffixArray(text);
    return sortedLRuns.map((v) => {
        if(v == 0){
            return sa[text.length-1] - sa[v]
        }else{
            return sa[v-1] - sa[v];
        }
    });
}

function pred(value : number, array : number[]){
    for(let i=0;i<array.length;i++){
        if(array[i] > value){
            return i-1;
        }
    }
    return array.length-1;
}
export function computeNextSuffixArrayValue(ithSAValue : number, sampledSuffixArrayForEndingPositions : number[], differentialSampledSuffixArrayForEndingPositions : number[]){
    const x = pred(ithSAValue, sampledSuffixArrayForEndingPositions); 
    if(x == -1){
        throw Error("Error");
    }else{
        return ithSAValue - differentialSampledSuffixArrayForEndingPositions[x];
    }
}
export function computeNextLCPValue(ithSAValue : number, sampledSuffixArrayForEndingPositions : number[], sampledLCPArrayForEndingPositions : number[]){
    const x = pred(ithSAValue, sampledSuffixArrayForEndingPositions); 
    if(x == -1){
        throw Error("Error");
    }else{
        const d = ithSAValue - sampledSuffixArrayForEndingPositions[x];
        return sampledLCPArrayForEndingPositions[x] - d;
    }
}

function computePreviousSuffixArrayValue(ithSAValue : number, sampledSuffixArrayForStartingPositions : number[], differentialSampledSuffixArrayForStartingPositions : number[]){
    const x = pred(ithSAValue, sampledSuffixArrayForStartingPositions); 
    if(x == -1){
        throw Error("Error");
    }else{
        return ithSAValue + differentialSampledSuffixArrayForStartingPositions[x];
    }
}


export function createSuffixArrayFromBack(text : string){
    const sampledSuffixArrayForStartingPositions = createSSAForStartingPositions(text);
    const differentialSampledSuffixArrayForStartingPositions = createDSAForStartingPositions(text);
    const lastSAValue = BWT.createCircularSuffixArray(text)[text.length-1];
    let p = lastSAValue;
    const r : number[] = new Array(text.length);
    r[text.length-1] = p;
    for(let i=text.length-2;i>= 0;i--){
        p = computePreviousSuffixArrayValue(p, sampledSuffixArrayForStartingPositions, differentialSampledSuffixArrayForStartingPositions);
        r[i] = p;
    }
    return r;
}
