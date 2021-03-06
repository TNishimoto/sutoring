/**
 * This namespace provides functions for minimal unique substrings.
 * <template data-path="sutoring.Substrings" data-module="MinimalUniqueSubstrings"></template>
 * @packageDocumentation
 */


import * as DistinctSubstrings from "./distinct_substrings"

export function enumerate(text: string): string[] {
    const map = DistinctSubstrings.createOccurrenceMap(text);
    const r: string[] = new Array(0);
    map.forEach((occs, substr) => {
        if (occs.length == 1) {
            if (substr.length == 1) {
                r.push(substr);
            } else {
                const left = substr.substr(1);
                const right = substr.substr(0, substr.length - 1);
                if (map.get(left)!.length > 1 && map.get(right)!.length > 1) {
                    r.push(substr);
                }
            }
        }
    })
    DistinctSubstrings.sort(r);

    return r;

}

