/**
 * This namespace provides functions for q-grams.
 * <template data-path="sutoring.Substrings" data-module="QGram"></template>
 * @packageDocumentation
 */


import * as DistinctSubstrings from "./distinct_substrings"

/**
 * 
 * @param text 
 * @param q <template data-value="1"></template>
 */
export function enumerateWithInfo(text: string, q : number): DistinctSubstrings.SubstringInfo[] {
    return DistinctSubstrings.enumerateWithInfo(text).filter((v)=> v.substring.length == q);
}

/**
 * 
 * @param text 
 * @param q <template data-value="1"></template>
 */
export function enumerate(text: string, q : number): string[] {
    return enumerateWithInfo(text, q).map((v) => v.substring);
}
