/**
 * This namespace provides functions for distinct substrings on a string.
 * <template data-path="sutoring.Substrings" data-module="DistinctSubstrings"></template>
 * @packageDocumentation
 */

 /**
  * 
  * @param strings <template data-value="aba, bbb, acc, abbb, baa"></template>
  */
export function sort(strings: string[]) : string[] {
    strings.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    })
    return strings;
}

export function enumerate(text: string): string[] {
    const map = createOccurrenceMap(text);
    const r: string[] = new Array(0);
    map.forEach((value, key) => {
        r.push(key);
    })
    sort(r);

    return r;
}
export function createOccurrenceMap(text: string): Map<string, number[]> {
    let map = new Map<string, number[]>();
    for (let i = 0; i < text.length; i++) {
        for (let len = 1; len <= text.length - i; len++) {
            const substr = text.substr(i, len);
            if (map.has(substr)) {
                const occs = map.get(substr)!;
                occs.push(i);
                map.set(substr, occs);
            } else {
                map.set(substr, [i]);
            }
        }
    }
    return map;
}
export type SubstringInfo = { substring : string, occurrences : number[]}
export function enumerateWithInfo(text: string): SubstringInfo[] {
    const arr : SubstringInfo[] = [];
    createOccurrenceMap(text).forEach((occs, substr) =>{
        arr.push({ substring : substr, occurrences : occs});
    })
    arr.sort((a, b) =>{
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    })
    return arr;
}
