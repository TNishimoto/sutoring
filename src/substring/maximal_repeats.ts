import * as DistinctSubstrings from "./distinct_substrings"

export function getAlphabet(text: string): Set<string> {
    const checker: Set<string> = new Set();
    for (let i = 0; i < text.length; i++) {
        checker.add(text[i]);
    }
    return checker;

}
export function enumerate(text: string) {
    const map = DistinctSubstrings.createOccurrenceMap(text);
    const substrSet: Set<string> = new Set();
    const characters = getAlphabet(text);

    map.forEach((occs, substr) => {
        let bLeft = true;
        let bRight = true;


        characters.forEach((c) => {
            const right = substr + c;
            const rightOcc = map.get(right);
            const left = c + substr;
            const leftOcc = map.get(left);

            if (rightOcc !== undefined && rightOcc.length == occs.length) {
                bRight = false;
            }
            if (leftOcc !== undefined && leftOcc.length == occs.length) {
                bLeft = false;
            }

        })
        if (bLeft && bRight && occs.length != 1) {
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
