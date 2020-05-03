import * as SAOnRLBWT from "../../dist/permutations/sa_on_rlbwt"
import * as BWT from "../../dist/permutations/bwt"
import {Console} from "graph-table-svg"

const text = "abaababaabaababaab$";

const sp1 = SAOnRLBWT.createSSAForEndingPositions(text);
const sp2 = SAOnRLBWT.createSSAForStartingPositions(text);

const arr1 = SAOnRLBWT.toArray(sp1);
const arr2 = SAOnRLBWT.toLogicTableLine("ending",arr1);

const arr3 = SAOnRLBWT.toArray(sp2);
const arr4 = SAOnRLBWT.toLogicTableLine("starting",arr3);

const bwtTable = BWT.constructBWTTable2(text, { withMiddleSubstrings : false,isRLBWT : true})

Console.view([bwtTable,arr2, arr4]);

