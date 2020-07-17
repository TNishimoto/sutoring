/**
 * This namespace provides compression measure delta.
 * <template data-path="sutoring.Substrings" data-module="Delta"></template>
 * @packageDocumentation
 */


import * as DistinctSubstrings from "./distinct_substrings"


export function delta(text : string) : number{
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
}