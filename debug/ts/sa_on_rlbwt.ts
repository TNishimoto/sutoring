import * as SAOnRLBWT from "../../dist/permutations/sa_on_rlbwt"
import * as BWT from "../../dist/permutations/bwt"

export function createSuffixArray(text : string){
    const sampledSuffixArrayForEndingPositions = SAOnRLBWT.createSSAForEndingPositions(text);
    const differentialSampledSuffixArrayForEndingPositions = SAOnRLBWT.createDSAForEndingPositions(text);
    const firstSAValue = BWT.createCircularSuffixArray(text)[0];
    let p = firstSAValue;
    const r : number[] = new Array();
    r.push(p);
    for(let i=1;i<text.length;i++){
        p = SAOnRLBWT.computeNextSuffixArrayValue(p, sampledSuffixArrayForEndingPositions, differentialSampledSuffixArrayForEndingPositions);
        r.push(p);
    }
    return r;
}

export function createLCPArray(text : string){
    const sampledSuffixArrayForEndingPositions = SAOnRLBWT.createSSAForEndingPositions(text);
    const differentialSampledSuffixArrayForEndingPositions = SAOnRLBWT.createDSAForEndingPositions(text);
    const sampledLCPArrayForEndingPositions = SAOnRLBWT.createSLCPArrayForEndingPositions(text);

    const firstSAValue = BWT.createCircularSuffixArray(text)[0];
    let p = firstSAValue;
    const r : number[] = new Array();
    const secondLCPValue = SAOnRLBWT.computeNextLCPValue(firstSAValue, sampledSuffixArrayForEndingPositions, sampledLCPArrayForEndingPositions);
    r.push(0);
    r.push(secondLCPValue);

    for(let i=1;i<text.length-1;i++){
        p = SAOnRLBWT.computeNextSuffixArrayValue(p, sampledSuffixArrayForEndingPositions, differentialSampledSuffixArrayForEndingPositions);        
        const lcp = SAOnRLBWT.computeNextLCPValue(p, sampledSuffixArrayForEndingPositions, sampledLCPArrayForEndingPositions);
        r.push(lcp);
    }
    return r;
}
