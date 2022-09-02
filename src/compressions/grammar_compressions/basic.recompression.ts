
import { RLSLPRule, RunProduction, PairProduction, RLSLP } from "./RLCFG"

import * as GraphTableSVG from "graph-table-svg";
import { runLengthEncode } from "../rle";
import { Random } from "../../random"

export type NonterminalAssign = "L" | "R";

export class AssignResult {
    assignDic: Map<number, NonterminalAssign> = new Map();
    newPairs: Set<string> = new Set();
    blocks: (number | [number, number])[] = new Array();
}
export class CompressionResult {
    level: number = 0;
    stringLengthMap: Map<number, number> = new Map();
    newLayer: number[] = new Array(0);
}

export class PairCompressResult extends CompressionResult {
    nonterminalLRMap: Map<number, NonterminalAssign> = new Map();
    thresholdOfStringLength = 0;
}
export class RLECompressResult extends CompressionResult {
    thresholdOfStringLength = 0;
}
export class CharacterCompressResult  extends CompressionResult {
}
export class LayerResults {
    layers: (CharacterCompressResult | PairCompressResult | RLECompressResult)[] = new Array();
    text: string = "";

    public toLogicTable(): GraphTableSVG.Logics.LogicTable {
        //const gtableOption : GTableOption = {}
        //const lengthMap = this.rlslp.createStringLengthMap();
        const table = new GraphTableSVG.Logics.LogicTable({ columnCount: this.text.length + 1, rowCount: this.layers.length + 1 });

        for (let i = 0; i < this.layers.length + 1; i++) {
            const y = table.rowCount - i - 1;

            if (i == 0) {
                table.cells[y][0].text = new GraphTableSVG.Logics.LogicText("T= ");
            } else {
                table.cells[y][0].text = new GraphTableSVG.Logics.LogicText(`T_{${i - 1}}= `);
                table.cells[y][0].text.isLatexMode = true;
            }
            table.cells[y][0].leftBorderOption.class = null;
            table.cells[y][0].topBorderOption.class = null;
            table.cells[y][0].bottomBorderOption.class = null;
            table.cells[y][0].backgroundOption.class = null;
            table.cells[y][0].backgroundOption.style = "fill: none";

        }

        for (let i = 0; i < this.text.length; i++) {
            table.cells[table.rowCount - 1][i + 1].text = new GraphTableSVG.Logics.LogicText(this.text[i]);
        }

        this.layers.forEach((v, i) => {
            let x = 1;
            const y = table.rowCount - i - 2;
            console.log(v)
            v.newLayer.forEach((cell) => {
                const len = v.stringLengthMap.get(cell)!;
                table.cells[y][x].text = new GraphTableSVG.Logics.LogicText(cell.toString());

                if(i + 1 < this.layers.length){
                    const next = <RLECompressResult | PairCompressResult>this.layers[i + 1];
                    
                    if(v.stringLengthMap.get(cell)! > next.thresholdOfStringLength){
                        table.cells[y][x].text.textDecoration = "line-through";
                    }
                    if (next instanceof PairCompressResult) {    
                        if (next.nonterminalLRMap.get(cell) == "L") {
                            table.cells[y][x].text.textDecoration = "underline";
                        }
                    }
    
                }

                if (len > 1) {
                    table.cells[y][x].connectedColumnCount = len;
                }
                x += len;
            })
        })
        return table;

    }
}


export class RecompressionResult {
    public rlslp: RLSLP = new RLSLP();
    public layerCompressionResult: LayerResults = new LayerResults();


}
export function char_compress(text: string, dic: Map<string, number>): CharacterCompressResult {
    const r = new CharacterCompressResult();
    for (let i = 0; i < text.length; i++) {
        const p = dic.get(text[i]);
        if (p == undefined) {
            const newNonterminal = dic.size;
            dic.set(text[i], newNonterminal);
            r.newLayer.push(newNonterminal);
            r.stringLengthMap.set(newNonterminal, 1);
        } else {
            r.newLayer.push(p);
        }
    }
    return r;

}
export function rle_comporess(nonterminals: number[], level: number, stringLengthMap: Map<number, number>, dic: Map<string, number>, skipLength : number = 0): RLECompressResult {
    const r = new RLECompressResult();
    r.thresholdOfStringLength = skipLength;
    r.level = level + 1;
    const nonterminalStr = nonterminals.map((v) => v.toString());
    runLengthEncode(nonterminalStr).characters.forEach((v) => {
        const childNonterminal = Number.parseInt(v.character);
        const childStringLen = stringLengthMap.get(childNonterminal)!;
        if(childStringLen > skipLength){
            r.stringLengthMap.set(childNonterminal, childStringLen);
            for(let i = 1;i <= v.run;i++){
                r.newLayer.push(childNonterminal);

            }
        }else{
            if (v.run == 1) {
                r.stringLengthMap.set(childNonterminal, childStringLen);
                r.newLayer.push(childNonterminal);
            } else {
                const pstr = `${v.character}^${v.run}`
                const p = dic.get(pstr);
                if (p == undefined) {
                    const newNonterminal = dic.size;
                    dic.set(pstr, newNonterminal);
                    const child = Number.parseInt(v.character);
                    r.stringLengthMap.set(newNonterminal, stringLengthMap.get(child)! * v.run);
                    r.newLayer.push(newNonterminal);
                } else {
                    r.newLayer.push(p);

                }
    
            }
    
        }
    });
    return r;
}

function assign(nonterminals: number[], seed: number, stringLengthMap: Map<number, number>, skipLength : number = 0): AssignResult {
    const random = new Random(seed);
    const result = new AssignResult();
    nonterminals.forEach((v) => {
        if(stringLengthMap.get(v)! <= skipLength){
            if (!result.assignDic.has(v)) {
                const p = random.nextInt(0, 1);
                result.assignDic.set(v, p == 0 ? "L" : "R");
            }    
        }
    })

    let i = 0;
    while (i < nonterminals.length) {
        const L: NonterminalAssign | undefined = result.assignDic.get(nonterminals[i]);
        if(L == undefined){
            result.blocks.push(nonterminals[i]);
            i++;
        }else{
            if (i == nonterminals.length - 1) {
                result.blocks.push(nonterminals[i]);
                i++;
            } else {
                const R: NonterminalAssign | undefined = result.assignDic.get(nonterminals[i + 1]);
                if(R == undefined){
                    result.blocks.push(nonterminals[i]);
                    i++;    
                }else{
                    if (L == "L" && R == "R") {
                        result.blocks.push([nonterminals[i], nonterminals[i + 1]]);
                        result.newPairs.add(`${nonterminals[i]}, ${nonterminals[i + 1]}`)
                        i += 2;
                    } else {
                        result.blocks.push(nonterminals[i]);
                        i++;
                    }
    
                }
            }
    
        }


    }
    return result;
}


function pair_compress(nonterminals: number[], level: number, stringLengthMap: Map<number, number>, dic: Map<string, number>, skipLength : number = 0): PairCompressResult {
    const r = new PairCompressResult();
    r.level = level + 1;
    r.thresholdOfStringLength = skipLength;

    let assignResult: AssignResult = assign(nonterminals, 0, stringLengthMap, skipLength);
    for (let i = 1; i < 100; i++) {
        let newAssignResult = assign(nonterminals, i, stringLengthMap, skipLength);

        if (newAssignResult.blocks.length < assignResult.blocks.length) {
            assignResult = newAssignResult;
        } else if (newAssignResult.blocks.length == assignResult.blocks.length && newAssignResult.newPairs.size < assignResult.newPairs.size) {
            assignResult = newAssignResult;
        }
    }
    assignResult.assignDic.forEach((value, key) => {
        r.nonterminalLRMap.set(key, value);
    })

    r.newLayer = assignResult.blocks.map((v) => {
        if (typeof v == "number") {
            r.stringLengthMap.set(v, stringLengthMap.get(v)!);
            return v;
        } else {
            const pstr = `${v[0]}, ${v[1]}`;
            const strLen = stringLengthMap.get(v[0])! + stringLengthMap.get(v[1])!;
            const p = dic.get(pstr);
            if (p == undefined) {
                const newNonterminal = dic.size;
                r.stringLengthMap.set(newNonterminal, strLen);
                dic.set(pstr, newNonterminal);
                return newNonterminal;
            } else {
                return p;
            }
        }
    })


    return r;
}

function translate(map: Map<string, number>): RLSLP {
    let r: RLSLPRule[] = new Array();
    let max = 0;
    map.forEach((value, key) => {
        const rule = new RLSLPRule();
        if (max < value) {
            max = value;
        }

        if (key.length == 1) {
            rule.leftHandSide = value;
            rule.rightHandSide = key;
        } else {
            if (key.indexOf(",") != -1) {
                const ps = key.split(",");
                const pair = new PairProduction();

                pair.leftNonterminal = Number.parseInt(ps[0]);
                pair.rightNonterminal = Number.parseInt(ps[1]);

                rule.leftHandSide = value;
                rule.rightHandSide = pair;
            } else {
                const ps = key.split("^");
                const runp = new RunProduction();

                runp.nonterminal = Number.parseInt(ps[0]);
                runp.run = Number.parseInt(ps[1]);

                rule.leftHandSide = value;
                rule.rightHandSide = runp;
            }
        }
        r.push(rule);
    })
    r.sort((a, b) => a.leftHandSide - b.leftHandSide);
    const rlslp = new RLSLP();
    rlslp.rules = r.map((v) => v);
    rlslp.startSymbol = max;
    return rlslp;
}

function computeSkipLength(isRestricted : boolean, level : number){
    if(isRestricted){
        const p1 = Math.ceil(level / 2) - 1;
        const p2 = Math.pow(4, p1);
        const p3 = Math.pow(3, p1);
        return Math.floor(p2 / p3);
    }else{
        return 0;
    }
}

export function compress(text: string, isRestricted : boolean): RecompressionResult {
    const r = new RecompressionResult();
    //const layerResults = new LayerResults();

    const dic: Map<string, number> = new Map();
    let layer: CharacterCompressResult | PairCompressResult | RLECompressResult = char_compress(text, dic);
    r.layerCompressionResult.layers.push(layer);
    r.layerCompressionResult.text = text;

    while (layer.newLayer.length > 1) {
        const skipLength = computeSkipLength(isRestricted, layer.level + 1);
        console.log(`level: ${layer.level}, skipLength = ${skipLength}`)
        console.log(layer.newLayer);
        if (layer instanceof CharacterCompressResult || layer instanceof PairCompressResult) {
            layer = rle_comporess(layer.newLayer, layer.level, layer.stringLengthMap, dic, skipLength);
        } else {
            layer = pair_compress(layer.newLayer, layer.level, layer.stringLengthMap, dic, skipLength);
        }
        r.layerCompressionResult.layers.push(layer);
    }
    r.rlslp = translate(dic);
    return r;
}
