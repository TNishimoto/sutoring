
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

import {LogicGraphTable} from "./graph_table"
import {LZ78} from "./lz78"
import {SuffixArray} from "./suffix_array"
import {MinimalUniqueSubstrings} from "./minimal_unique_substrings"


export{
    //Common, GUI, Rectangle, GObjectAttributes, SVG, HTMLFunctions, CustomAttributeNames, 
    //ShapeObjectType, openSVG, openHTML, openCustomElement, openSVGFunctions, lazyOpenSVG,
    //LogicTable, LogicTree, Console, GObject, GPathTextBox,
    LZ78,
    SuffixArray, MinimalUniqueSubstrings,
    LogicGraphTable
}

console.log("Loaded Index.ts")