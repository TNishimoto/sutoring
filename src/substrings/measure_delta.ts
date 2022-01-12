/**
 * This namespace provides compression measure delta.
 * <template data-path="sutoring.Substrings" data-module="MeasureDelta"></template>
 * @packageDocumentation
 */

 import { Logics } from "graph-table-svg"
import { CellCSS } from "graph-table-svg/dist/objects/g_options";
import { Cell } from "graph-table-svg/dist/objects/table_helpers/cell";
import * as DistinctSubstrings from "./distinct_substrings"

export type sharpDeltaInfo = { substrLength: number, substrCount : number, sharpDelta : number }


export function getDistinctSubstrings(text : string) : string[][]{
    const distinctSubstrings = DistinctSubstrings.createOccurrenceMap(text);

    let maxLen =text.length;
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

    const substring_arrays = distinctSubstrings.map((v, i) =>{
        return v.join(", ");
    });
    const len_arrays = distinctSubstrings.map((v, i) =>{
        return (i).toString();
    });


    const css : CellCSS = { horizontalAnchor : "left"};
    const substr_line = Logics.buildLogicCellLine("Substrings", substring_arrays, { style:  css } );
    const len_line = Logics.buildLogicCellLine("Length", len_arrays );

    return Logics.buildLogicTable([len_line, substr_line], { isRowLines: false })

}




export function getSharpDeltaInfoArray(text : string) : sharpDeltaInfo[]{
    const substrings = getDistinctSubstrings(text);
    const r : sharpDeltaInfo[] = new Array(substrings.length);
    for(let i=0;i<r.length;i++){
        const delta = i == 0 ? 0 :  (substrings[i].length / i );
        r[i] = { substrLength : (i), substrCount : substrings[i].length, sharpDelta : delta };
    }
    return r;
     
}

export function getSharpDeltaInfoTable(text : string) : Logics.LogicTable{
    const array = getSharpDeltaInfoArray(text);

    const substrLengthArray = array.map((v) =>{
        return v.substrLength.toString();
    });
    const substrCountArray = array.map((v) =>{
        return v.substrCount.toString();
    });
    const sharpDeltaArray = array.map((v) =>{
        return v.sharpDelta.toString();
    });

    const lengthLine = Logics.buildLogicCellLine("Substring length", substrLengthArray );
    const countLine = Logics.buildLogicCellLine("Substring count", substrCountArray );
    const sharpDeltaLine = Logics.buildLogicCellLine("Sharp delta", sharpDeltaArray );

    return Logics.buildLogicTable([lengthLine, countLine, sharpDeltaLine], { isRowLines: false })


}


export function delta(text : string) : number{
    const subDeltaInfoArray = getSharpDeltaInfoArray(text);
    const max = subDeltaInfoArray.map((a) => a.sharpDelta).reduce((a,b)=>a>b?a:b);
    return max;
}