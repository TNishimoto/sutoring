
/*
import {Common} from "./common/common"
import {GUI} from "./common/gui_observe"
import {Rectangle} from "./common/vline"

import {GObjectAttributes} from "./options/attributes_option"
import {SVG} from "./svghtml/svg"
import {HTMLFunctions} from "./svghtml/html_functions"

import { CustomAttributeNames } from "./options/custtome_attributes"
import { ShapeObjectType } from "./common/enums";
import { openSVG, openHTML, openCustomElement, openSVGFunctions, lazyOpenSVG } from "./options/open_svg";
import { LogicTable } from "./options/logic_table";
import { LogicTree } from "./options/logic_tree";
import { Console } from "./svghtml/console";

import {GObject} from "./object/g_object"
import {GPathTextBox} from "./object/g_path_textbox"
*/

import * as Console from "console"

//import * as LogicGraphTable from "./graph_table"
import * as LZ78 from "./factorization/lz78"
import * as SuffixArray from "./array/suffix_array"
import * as LCPArray from "./array/lcp_array"

import * as MinimalUniqueSubstrings from "./substring/minimal_unique_substrings"
import * as DistinctSubstrings from "./substring/distinct_substrings"
import * as MaximalRepeats from "./substring/maximal_repeats"
import * as MinimalRepeats from "./substring/minimal_repeats"

import * as FibonacciString from "./string/fibonacci_string"
import * as Trie from "./tree/trie"
import * as SuffixTrie from "./tree/suffix_trie"
import * as SuffixTree from "./tree/suffix_tree"
import * as BWT from "./permutation/bwt"
import * as RLBWT from "./permutation/rlbwt"
import * as SAonRLBWT from "./permutation/sa_on_rlbwt"
import * as Debug from "./debug/debug"

//import { GGraph } from "ggraph"


export{
    //Common, GUI, Rectangle, GObjectAttributes, SVG, HTMLFunctions, CustomAttributeNames, 
    //ShapeObjectType, openSVG, openHTML, openCustomElement, openSVGFunctions, lazyOpenSVG,
    //LogicTable, LogicTree, Console, GObject, GPathTextBox,
    Console,
    LZ78,
    SuffixArray, MinimalUniqueSubstrings, DistinctSubstrings, MaximalRepeats, MinimalRepeats,
    FibonacciString, Trie, SuffixTrie, SuffixTree, 
    BWT, RLBWT, SAonRLBWT, Debug,LCPArray
}
