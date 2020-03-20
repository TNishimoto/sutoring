//import { type } from "os";
import {lce} from "../string_functions"

export type LZ77Factor = { position: number, length: number } | string;

/**
 * Compute the LZ77 factor $F$ starting at position $pos$ using string $text[1..pos + |F|-1]$, where $|F|$ is the length of the factor.
 * @param text Input string.
 * @param pos Input position.
 */
function find(text: string, pos: number): LZ77Factor {
    let len = 0;
    let referencePos = -1;
    for (let i = 0; i < pos; i++) {
        const len2 = lce(text, i, pos);
        if (len2 > len) {
            referencePos = i;
            len = len2;
        }
    }
    if (len == 0) {
        return text[pos];
    } else {
        return { position: referencePos, length: len };
    }

}

export function factorize(text: string): string[] {
    const factors = compress(text);
    return factors.map((v) => {
        if (typeof (v) == "string") {
            return v;
        } else {
            return text.substr(v.position, v.length);
        }
    });


}
export function compress(text: string): LZ77Factor[] {
    const r: LZ77Factor[] = new Array();
    let i = 0;
    while (i < text.length) {
        console.log(i);
        const f = find(text, i);
        r.push(f);
        if (typeof (f) == "string") {
            i += 1;
        } else {
            if (f.length == 0) throw new Error("error");

            i += f.length;
        }
    }
    return r;
}
