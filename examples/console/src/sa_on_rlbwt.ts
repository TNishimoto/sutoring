import * as sutoring from "sutoring"

const text = "abaababaabaababaab$";

const sp1 = sutoring.Permutations.SAonRLBWT.createSSAForEndingPositions(text);
const sp2 = sutoring.Permutations.SAonRLBWT.createSSAForStartingPositions(text);

const arr1 = sutoring.Permutations.SAonRLBWT.toArray(sp1);
const arr2 = sutoring.Permutations.SAonRLBWT.toLogicTableLine("ending",arr1);

const arr3 = sutoring.Permutations.SAonRLBWT.toArray(sp2);
const arr4 = sutoring.Permutations.SAonRLBWT.toLogicTableLine("starting",arr3);

const bwtTable = sutoring.Permutations.BWT.constructBWTTable2(text, { withMiddleSubstrings : false,isRLBWT : true})
sutoring.Console.view([bwtTable,arr2, arr4])

