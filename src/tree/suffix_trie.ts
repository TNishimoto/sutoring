import { LogicTree } from "logic_tree";
import * as Trie from "./trie";
export function getSuffixes(text: string): string[] {
    const texts: string[] = new Array();
    for (let i = 0; i < text.length; i++) {
        texts.push(text.substr(i));
    }
    return texts;

}
export function construct(text: string): LogicTree {
    return Trie.construct(getSuffixes(text));


}
