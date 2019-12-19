/**
 * This namespace provides functions for distinct substrings on a string.
 */
export function sort(strings: string[]) {
    strings.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    })

}

export function enumerate(text: string): string[] {
    const map = enumerateWithOccurrences(text);
    const r: string[] = new Array(0);
    map.forEach((value, key) => {
        r.push(key);
    })
    sort(r);

    return r;
}
export function enumerateWithOccurrences(text: string): Map<string, number[]> {
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
