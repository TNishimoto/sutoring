import { LogicTree } from "graph-table-svg";
import * as CompactTrie from "./compact_trie";
import * as SuffixTrie from "./suffix_trie";

export function construct(text: string): LogicTree {
    const tree = CompactTrie.construct(SuffixTrie.enumerateSuffixes(text));
    return tree;


}
