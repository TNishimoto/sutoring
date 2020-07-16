/**
 * This namespace provides functions for suffix trees.
 * <template data-path="sutoring.Trees" data-module="SuffixTree"></template>
 * @packageDocumentation
 */

import { Logics } from "graph-table-svg";
import * as CompactTrie from "./compact_trie";
import * as SuffixTrie from "./suffix_trie";

export function construct(text: string): Logics.LogicTree {
    const tree = CompactTrie.construct(SuffixTrie.enumerateSuffixes(text));
    return tree;


}
