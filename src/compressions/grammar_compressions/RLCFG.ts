//export type PairProduction = { left_nonterminal: number, right_nonterminal : number};
//export type RunProduction = { nonterminal: number, repetition : number};

export class RunProduction{
    public nonterminal : number = 0;
    public run : number = 0;
}
export class PairProduction{
    public leftNonterminal : number = 0;
    public rightNonterminal : number = 0;
}
export class RLSLPRule {
    public leftHandSide : number = 0;
    public rightHandSide : string | RunProduction | PairProduction = "";
}

//export type RLSLPRule = { nonterminal: number, production: string | PairProduction | RunProduction };


export class RLSLP {
    public rules : RLSLPRule[] = new Array();
    public startSymbol : number = 0;

    public createStringLengthMap() : Map<number, number>{
        const map : Map<number, number> = new Map();
        this.rules.forEach((v) =>{
            if(typeof v.rightHandSide == "string"){
                map.set(v.leftHandSide, v.rightHandSide.length);
            }else if(v.rightHandSide instanceof PairProduction){
                const leftLen = map.get(v.rightHandSide.leftNonterminal);
                const rightLen = map.get(v.rightHandSide.rightNonterminal);
                if(leftLen == undefined || rightLen == undefined){
                    throw new Error(`Error ${v.rightHandSide.leftNonterminal} -> ${leftLen}, ${v.rightHandSide.rightNonterminal} -> ${rightLen}`);
                }else{
                    map.set(v.leftHandSide, leftLen + rightLen);
                }
            }else{
                const len = map.get(v.rightHandSide.nonterminal);
                if(len == undefined){
                    throw new Error("Error");
                }else{
                    map.set(v.leftHandSide, len * v.rightHandSide.run);
                }
            }
        })
        return map;
    }
    /*
    public create_original_string(){

    }
    */
}
