/**
 * This namespace provides functions for Thue-Morse sequences.
 * @packageDocumentation
 */

const fibArray: Map<number, string> = new Map();
function rev(str : string){
    let r : string = "";
    for(let i=0;i<str.length;i++){
        if(str[i] == "0"){
            r += "1";
        }else{
            r += "0";
        }
    }
    return r;
}
export function createIthSequence(ith: number): string {
    if (ith == 0) {
        if (!fibArray.has(ith)) {
            fibArray.set(ith, "");
        }
        return fibArray.get(ith)!;
    } else if (ith == 1) {
        if (!fibArray.has(ith)) {
            fibArray.set(ith, "0");
        }
        return fibArray.get(ith)!;
    } else {
        if (!fibArray.has(ith)) {
            const str = createIthSequence(ith - 1) + rev(createIthSequence(ith - 1));
            fibArray.set(ith, str);
        }
        return fibArray.get(ith)!;

    }
}
/**
 * Return the thue-morse sequence of an input length.
 * 
 * @param len the length of the output string <!-- pramster -->
 */
export function create(len : number){
    let i=1;
    while(true){
        const str = createIthSequence(i);
        if(str.length < len){
            i++;
        }else{
            return str.substr(0, len);
        }
    }
}