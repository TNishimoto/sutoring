

import { Console } from "graph-table-svg"

//import * as LogicGraphTable from "./graph_table"
import * as LZ78 from "./factorizations/lz78"
import * as SuffixArray from "./array/suffix_array"
import * as LCPArray from "./array/lcp_array"

import * as MinimalUniqueSubstrings from "./substrings/minimal_unique_substrings"
import * as DistinctSubstrings from "./substrings/distinct_substrings"
import * as MaximalRepeats from "./substrings/maximal_repeats"
import * as MinimalRepeats from "./substrings/minimal_repeats"

import { FibonacciSequence, ThueMorseSequence} from "./sequences/index"



import * as Trie from "./trees/trie"
import * as SuffixTrie from "./trees/suffix_trie"
import * as SuffixTree from "./trees/suffix_tree"
import * as BWT from "./permutations/bwt"
import * as RLBWT from "./permutations/rlbwt"
import * as SAonRLBWT from "./permutations/sa_on_rlbwt"
import * as Debug from "./debug/debug"

//import { GGraph } from "ggraph"


export{
    //Common, GUI, Rectangle, GObjectAttributes, SVG, HTMLFunctions, CustomAttributeNames, 
    //ShapeObjectType, openSVG, openHTML, openCustomElement, openSVGFunctions, lazyOpenSVG,
    //LogicTable, LogicTree, Console, GObject, GPathTextBox,
    Console,
    LZ78,
    SuffixArray, MinimalUniqueSubstrings, DistinctSubstrings, MaximalRepeats, MinimalRepeats,
    Trie, SuffixTrie, SuffixTree, 
    BWT, RLBWT, SAonRLBWT, Debug,LCPArray, 
    FibonacciSequence, ThueMorseSequence
}
