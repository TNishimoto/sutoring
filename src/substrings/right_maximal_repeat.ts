/**
 * This namespace provides functions for right maximal repeats.
 * <template data-path="sutoring.Substrings" data-module="RightMaximalRepeats"></template>
 * @packageDocumentation
 */


import * as DistinctSubstrings from "./distinct_substrings"
import {getAlphabet} from "../string_functions"

export function enumerate(text: string) {
    const map = DistinctSubstrings.createOccurrenceMap(text);
    const substrSet: Set<string> = new Set();
    const characters = getAlphabet(text);

    map.forEach((occs, substr) => {
        let bRight = true;


        characters.forEach((c) => {
            const right = substr + c;
            const rightOcc = map.get(right);

            if (rightOcc !== undefined && rightOcc.length == occs.length) {
                bRight = false;
            }

        })
        if (bRight && occs.length != 1) {
            substrSet.add(substr);
        }
    })
    const r: string[] = new Array(0);
    substrSet.forEach((substr) => {
        r.push(substr);
    })
    DistinctSubstrings.sort(r);
    return r;

}
