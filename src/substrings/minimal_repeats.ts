import * as DistinctSubstrings from "./distinct_substrings"
import * as MaximalRepeats from "./maximal_repeats"
import {getAlphabet} from "../string_functions"

export function enumerate(text: string) {
    const map = DistinctSubstrings.createOccurrenceMap(text);
    const substrSet: Set<string> = new Set();
    const characters = getAlphabet(text);

    map.forEach((occs, substr) => {
        let bLeft = true;
        let bRight = true;

        characters.forEach((c) => {
            const right = substr.substr(0, substr.length - 1);
            const rightOcc = map.get(right);
            const left = substr.substr(1, substr.length - 1);
            const leftOcc = map.get(left);

            if (rightOcc !== undefined && rightOcc.length == occs.length) {
                bRight = false;
            }
            if (leftOcc !== undefined && leftOcc.length == occs.length) {
                bLeft = false;
            }

        })
        if (bLeft && bRight) {
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

