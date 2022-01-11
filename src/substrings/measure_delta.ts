/**
 * This namespace provides compression measure delta.
 * <template data-path="sutoring.Substrings" data-module="MeasureDelta"></template>
 * @packageDocumentation
 */

 import { Logics } from "graph-table-svg"
import * as DistinctSubstrings from "./distinct_substrings"

export type SubDeltaInfo = { substrLength: number, substrCount : number, subDelta : number }


export function getDistinctSubstrings(text : string) : string[][]{
    const distinctSubstrings = DistinctSubstrings.createOccurrenceMap(text);
    //const countMap : Map<number, number> = new Map();

    let maxLen =text.length;
    //distinctSubstrings.forEach((_, key) =>{
    //    if(maxLen < key.length) maxLen = key.length;
    //})
    const r : string[][] = new Array(maxLen+1);
    for(let i=0;i<r.length;i++){
        r[i] = new Array(0);
    }
    distinctSubstrings.forEach((_, key) =>{
        r[key.length].push(key);
    })

    return r;
}

export function getDistinctSubstringsTable(text : string) : Logics.LogicTable{
    const distinctSubstrings = getDistinctSubstrings(text);
    const arrays = distinctSubstrings.map((v, i) =>{
        const p = new Array(2);
        p[0] = i.toString();
        p[1] = v.join(", ");
        return p;
    });

    return Logics.buildLogicTable(arrays, { isRowLines: true })

}


export function getSubDeltaInfoArray(text : string) : SubDeltaInfo[]{
    const substrings = getDistinctSubstrings(text);
    const r : SubDeltaInfo[] = new Array(substrings.length);
    for(let i=0;i<r.length;i++){
        const delta = i == 0 ? 0 : (substrings[i].length / i);
        r[i] = { substrLength : i, substrCount : substrings[i].length, subDelta : delta };
    }
    return r;
     
}


export function delta(text : string) : number{
    const subDeltaInfoArray = getSubDeltaInfoArray(text);
    const max = subDeltaInfoArray.map((a) => a.subDelta).reduce((a,b)=>a>b?a:b);
    return max;
    /*
    const x = DistinctSubstrings.createOccurrenceMap(text);
    const countMap : Map<number, number> = new Map();
    x.forEach((value, key) =>{
        const len = key.length;
        const count = countMap.has(len) ? countMap.get(len)! : 0;
        countMap.set(len, count+1);
    })
    let max = 0;
    countMap.forEach((count, len) =>{
        const v = count / len;
        if(v > max){
            max = v;
        }
    })
    return max;
    */
}