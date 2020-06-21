
import libxmljs = require('libxmljs');
export type TypeDocParameter = { name: string; type: string, option: Map<string,string> | null };

/*
export function commentParse(comment: string): Map<string, string> {
    const map = new Map<string, string>();
    const arrs = comment.split(" ");
    for (let i = 0; i < arrs.length - 1; i++) {
        if (arrs[i].length > 0 && arrs[i][0] == "@") {
            const name = arrs[i].substr(1);
            const value = arrs[i + 1];
            map.set(name, value);
        }
    }
    return map;
}
*/
export function templateParse(template: libxmljs.Element): Map<string, string> {
    const map = new Map<string, string>();
    template.attrs().forEach((v)=>{
        const name = v.name().substr(5);
        const value = v.value();
        map.set(name, value);

    } )
    return map;
}

export function parseHtmlFragments(str: string): libxmljs.Node[] {
    const doc = libxmljs.parseHtmlFragment(`<root>${str}</root>`);
    return doc.root()!.childNodes();
}
/*
export function parseHtmlFragment(str: string): libxmljs.Node {
    const doc = libxmljs.parseHtmlFragment(`${str}`);
    return doc.root()!.childNodes();
}
*/
