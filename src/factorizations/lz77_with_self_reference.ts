import { type } from "os";


export type LZ77Factor = { position: number, length: number } | string;

function lce(text: string, pos1: number, pos2: number): number {
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
