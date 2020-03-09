import * as DistinctSubstrings from "./distinct_substrings"


export function enumerateWithInfo(text: string, q : number): DistinctSubstrings.SubstringInfo[] {
    return DistinctSubstrings.enumerateWithInfo(text).filter((v)=>{ v.substring.length == q});
}


export function enumerate(text: string, q : number): string[] {
    return enumerateWithInfo(text, q).map((v) => v.substring);
}
