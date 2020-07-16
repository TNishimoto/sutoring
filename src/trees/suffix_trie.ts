/**
 * This namespace provides functions for suffix tries.
 * <template data-path="sutoring.Trees" data-module="SuffixTrie"></template>
 * @packageDocumentation
 */

import { Logics } from "graph-table-svg";
import * as Trie from "./trie";
export function enumerateSuffixes(text: string): string[] {
    const texts: string[] = new Array();
    for (let i = 0; i < text.length; i++) {
        texts.push(text.substr(i));
    }
    return texts;

}
export function construct(text: string): Logics.LogicTree {
    return Trie.construct(enumerateSuffixes(text));


}
