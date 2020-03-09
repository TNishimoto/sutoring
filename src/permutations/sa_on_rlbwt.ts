import * as BWT from "./bwt"
import * as LCP from "../array/lcp_array"

import * as RLBWT from "./rlbwt"


function createSortedLRunStartingPositionsBySuffixArray(text : string) : number[]{
    const lruns = RLBWT.createLRunStartingPositions(text)
    const sa = BWT.createCircularSuffixArray(text);
    lruns.sort((a, b)=>{
        return sa[a] < sa[b] ? -1 :1;
    })
    return lruns;
}
function createSortedLRunEndingPositionsBySuffixArray(text : string) : number[]{
    const lruns = RLBWT.createLRunEndingPositions(text)
    const sa = BWT.createCircularSuffixArray(text);
    lruns.sort((a, b)=>{
        return sa[a] < sa[b] ? -1 :1;
    })
    return lruns;
}


function createSampledSuffixArrayForEndingPositions(text : string) : number[]{
    const sortedLRuns = createSortedLRunEndingPositionsBySuffixArray(text);
    const sa = BWT.createCircularSuffixArray(text);
    return sortedLRuns.map((v) => sa[v]);
}
function createSampledSuffixArrayForStartingPositions(text : string) : number[]{
    const sortedLRuns = createSortedLRunStartingPositionsBySuffixArray(text);
    const sa = BWT.createCircularSuffixArray(text);
    return sortedLRuns.map((v) => sa[v]);
}
function createSampledLCPArrayForEndingPositions(text : string) : number[]{
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


function createDifferentialSampledSuffixArrayForEndingPositions(text : string) : number[]{
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
function createDifferentialSampledSuffixArrayForStartingPositions(text : string) : number[]{
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
function computeNextSuffixArrayValue(ithSAValue : number, sampledSuffixArrayForEndingPositions : number[], differentialSampledSuffixArrayForEndingPositions : number[]){
    const x = pred(ithSAValue, sampledSuffixArrayForEndingPositions); 
    if(x == -1){
        throw Error("Error");
    }else{
        return ithSAValue - differentialSampledSuffixArrayForEndingPositions[x];
    }
}
function computeNextLCPValue(ithSAValue : number, sampledSuffixArrayForEndingPositions : number[], sampledLCPArrayForEndingPositions : number[]){
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

export function createSuffixArray(text : string){
    const sampledSuffixArrayForEndingPositions = createSampledSuffixArrayForEndingPositions(text);
    const differentialSampledSuffixArrayForEndingPositions = createDifferentialSampledSuffixArrayForEndingPositions(text);
    const firstSAValue = BWT.createCircularSuffixArray(text)[0];
    let p = firstSAValue;
    const r : number[] = new Array();
    r.push(p);
    for(let i=1;i<text.length;i++){
        p = computeNextSuffixArrayValue(p, sampledSuffixArrayForEndingPositions, differentialSampledSuffixArrayForEndingPositions);
        r.push(p);
    }
    return r;
}

export function createLCPArray(text : string){
    const sampledSuffixArrayForEndingPositions = createSampledSuffixArrayForEndingPositions(text);
    const differentialSampledSuffixArrayForEndingPositions = createDifferentialSampledSuffixArrayForEndingPositions(text);
    const sampledLCPArrayForEndingPositions = createSampledLCPArrayForEndingPositions(text);

    const firstSAValue = BWT.createCircularSuffixArray(text)[0];
    let p = firstSAValue;
    const r : number[] = new Array();
    const secondLCPValue = computeNextLCPValue(firstSAValue, sampledSuffixArrayForEndingPositions, sampledLCPArrayForEndingPositions);
    r.push(0);
    r.push(secondLCPValue);

    for(let i=1;i<text.length-1;i++){
        p = computeNextSuffixArrayValue(p, sampledSuffixArrayForEndingPositions, differentialSampledSuffixArrayForEndingPositions);        
        const lcp = computeNextLCPValue(p, sampledSuffixArrayForEndingPositions, sampledLCPArrayForEndingPositions);
        r.push(lcp);
    }
    return r;
}

export function createSuffixArrayFromBack(text : string){
    const sampledSuffixArrayForStartingPositions = createSampledSuffixArrayForStartingPositions(text);
    const differentialSampledSuffixArrayForStartingPositions = createDifferentialSampledSuffixArrayForStartingPositions(text);
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
