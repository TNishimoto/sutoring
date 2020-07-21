
export function getAlphabet(text: string): Set<string> {
    const checker: Set<string> = new Set();
    for (let i = 0; i < text.length; i++) {
        checker.add(text[i]);
    }
    return checker;
}
/**
 * Return the length of the longest common prefix of the two prefixes $text[pos1..]$ and $text[pos2..]$.
 * @param text Input text.
 * @param pos1 The starting position of the first prefix.
 * @param pos2 The starting position of the second prefix.
 */
export function lce(text: string, pos1: number, pos2: number): number {
    let t = 0;
    while (true) {
        let i = pos1 + t;
        let j = pos2 + t;
        if (i >= text.length || j >= text.length) {
            return t;
        } else {
            if (text[i] == text[j]) {
                t++;
            } else {
                return t;
            }
        }

    }
}
export function lcp(text1: string, text2: string): number {
    const max = text1.length < text2.length ? text2.length : text1.length;
    for (let i = 0; i < max; i++) {
        if (text1[i] != text2[i]) return i;
    }
    return max;
}
