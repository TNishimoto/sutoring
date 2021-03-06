/**
 * This namespace provides functions for Fibonacci sequences.
 * <template data-path="sutoring.Sequences" data-module="FibonacciSequence"></template>
 * @packageDocumentation
 */


const fibArray: Map<number, string> = new Map();
export function createIthSequence(ith: number): string {
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
            const str = createIthSequence(ith - 1) + createIthSequence(ith - 2);
            fibArray.set(ith, str);
        }
        return fibArray.get(ith)!;

    }
}
export function create(length: number) {
    let i = 2;
    while (true) {
        const str = createIthSequence(i++);
        if (str.length > length) {
            return str.substr(0, length);
        }
    }
}
export function getWord(ith: number) {
    let i = 0;
    while (true) {
        const str = createIthSequence(i++);
        if (i == ith) {
            return str;
        } else {
            i++;
        }
    }

}
