import { LogicTree } from "logic_tree";
import * as CompactTrie from "./compact_trie";
import * as SuffixTrie from "./suffix_trie";

export function construct(text: string): LogicTree {
    const tree = CompactTrie.construct(SuffixTrie.getSuffixes(text));
    return tree;


}
