

const fibArray: Map<number, string> = new Map();
function create(ith: number): string {
    if (ith == 0) {
        if (!fibArray.has(ith)) {
            fibArray.set(ith, "");
        }
        return fibArray.get(ith)!;
    } else if (ith == 1) {
        if (!fibArray.has(ith)) {
            fibArray.set(ith, "b");
        }
        return fibArray.get(ith)!;
    } else if (ith == 2) {
        if (!fibArray.has(ith)) {
            fibArray.set(ith, "a");
        }
        return fibArray.get(ith)!;
    } else {
        if (!fibArray.has(ith)) {
            const str = create(ith - 1) + create(ith - 2);
            fibArray.set(ith, str);
        }
        return fibArray.get(ith)!;

    }
}
export function enumerate(length: number) {
    let i = 2;
    while (true) {
        const str = create(i++);
        if (str.length > length) {
            return str.substr(0, length);
        }
    }
}
export function getWord(ith: number) {
    let i = 0;
    while (true) {
        const str = create(i++);
        if (i == ith) {
            return str;
        } else {
            i++;
        }
    }

}
