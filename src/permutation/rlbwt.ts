import * as BWT from "./bwt"

type RLEFactor = { char : string, length : number}

export function runLengthEncode(text: string) : RLEFactor[]{
    if(text.length == 0){
        return new Array();
    }else{
        const r = new Array();
        let m : number= 1;
        let c : string = text[0];
    
        for(let i=1;i<text.length;i++){
            if(text[i] != c){
                r.push({ char : c, length : m});
                m = 1;
                c = text[i];
            }else{
                m++
            }
        }
        if(m >= 1){
            r.push({ char : c, length : m});
        }
        return r;
    
    }
}

export function construct(text: string) : RLEFactor[] {
    const bwt = BWT.construct(text);
    return runLengthEncode(bwt);
}
