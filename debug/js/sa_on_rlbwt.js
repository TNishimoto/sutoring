"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SAOnRLBWT = require("../../dist/permutations/sa_on_rlbwt");
const BWT = require("../../dist/permutations/bwt");
function createSuffixArray(text) {
    const sampledSuffixArrayForEndingPositions = SAOnRLBWT.createSSAForEndingPositions(text);
    const differentialSampledSuffixArrayForEndingPositions = SAOnRLBWT.createDSAForEndingPositions(text);
    const firstSAValue = BWT.createCircularSuffixArray(text)[0];
    let p = firstSAValue;
    const r = new Array();
    r.push(p);
    for (let i = 1; i < text.length; i++) {
        p = SAOnRLBWT.computeNextSuffixArrayValue(p, sampledSuffixArrayForEndingPositions, differentialSampledSuffixArrayForEndingPositions);
        r.push(p);
    }
    return r;
}
exports.createSuffixArray = createSuffixArray;
function createLCPArray(text) {
    const sampledSuffixArrayForEndingPositions = SAOnRLBWT.createSSAForEndingPositions(text);
    const differentialSampledSuffixArrayForEndingPositions = SAOnRLBWT.createDSAForEndingPositions(text);
    const sampledLCPArrayForEndingPositions = SAOnRLBWT.createSLCPArrayForEndingPositions(text);
    const firstSAValue = BWT.createCircularSuffixArray(text)[0];
    let p = firstSAValue;
    const r = new Array();
    const secondLCPValue = SAOnRLBWT.computeNextLCPValue(firstSAValue, sampledSuffixArrayForEndingPositions, sampledLCPArrayForEndingPositions);
    r.push(0);
    r.push(secondLCPValue);
    for (let i = 1; i < text.length - 1; i++) {
        p = SAOnRLBWT.computeNextSuffixArrayValue(p, sampledSuffixArrayForEndingPositions, differentialSampledSuffixArrayForEndingPositions);
        const lcp = SAOnRLBWT.computeNextLCPValue(p, sampledSuffixArrayForEndingPositions, sampledLCPArrayForEndingPositions);
        r.push(lcp);
    }
    return r;
}
exports.createLCPArray = createLCPArray;
