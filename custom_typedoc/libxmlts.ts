import libxmljs = require('libxmljs');

export namespace libxmlts {

    export type NodeType = "text" | "attribute" | "element" | "cdata" | "comment" | "pi" | "dtd" | "document";
    //export type InnerNode = Element | Text | CDATA | Comment | ProcessingInstruction;
    export class XMLNode {
        private _original: libxmljs.Element | libxmljs.Attribute;
        protected _type: NodeType;
        public get original(): libxmljs.Element | libxmljs.Attribute {
            return this._original;
        }
        constructor(__item: libxmljs.Element | libxmljs.Attribute, __type: NodeType) {
            this._original = __item;
            this._type = __type;
        }



        public remove(): void {
            this.original.remove();
        }
        public get type(): NodeType {
            return this._type;
        }
        public toString(): string {
            return this.original.toString();
        }
        public get doc(): libxmlts.Document {
            return new libxmlts.Document((<any>this.original).doc());
        }
        public get parent(): libxmlts.Element | null {
            const parent = (<any>this.original).parent();
            if (parent == null) return null;
            const type = parent.type();
            if (type == "element") {
                return new libxmlts.Element(parent);
            } else {
                return null;
            }
        }
        public get prevSibling(): libxmlts.XMLNode | null {
            const item = (<libxmljs.Element>this.original).prevSibling();
            if (item == null) {
                return null;
            } else {
                return <libxmlts.XMLNode>constructNodeItem(item);
            }
        }
        public get nextSibling(): libxmlts.XMLNode | null {
            const item = (<libxmljs.Element>this.original).nextSibling();
            if (item == null) {
                return null;
            } else {
                return <libxmlts.XMLNode>constructNodeItem(item);
            }
        }
    }
    export class InnerNode extends XMLNode{
        
        public get original(): libxmljs.Element {
            return <libxmljs.Element>super.original;
        }
        public addNextSibling(node : InnerNode) : InnerNode{
            const r = this.original.addNextSibling(node.original);
            const resultNode = constructInnerNode(r);
            return resultNode;
        }
        public addNextSiblings(nodes : InnerNode[]) : InnerNode[]{
            let prev : InnerNode  = this;
            let r : InnerNode[] = new Array();
            nodes.forEach((v)=>{
                prev = prev.addNextSibling(v);
                r.push(prev);
            } )
            return r;
        }

        public addPrevSibling(node : InnerNode) : InnerNode{
            const r = this.original.addPrevSibling(node.original);
            const resultNode = constructInnerNode(r);
            return resultNode;
        }
        public replace(item: string | InnerNode): InnerNode {
            const r: libxmljs.Element = (<any>this.original).replace(item);
            return <InnerNode>constructNodeItem(r);
        }
        public addInto(element : Element) : Element{
            element.addChild(this);
            return element;
        }
        public replaceByDocumentFragment(fragment : string) : InnerNode[]{
            const p = this.addNextSiblings(this.doc.parseDocumentFragment(fragment));
            this.remove();
            return p;
        }
        
    }
    function constructNodeItem(v: libxmljs.Element | libxmljs.Attribute | libxmljs.XMLDocument): XMLNode {
        const type = (<any>v).type();
        if (type == "text") {
            return new Text(<libxmljs.Element>v);
        } else if (type == "element") {
            return new Element(<libxmljs.Element>v);
        } else if (type == "comment") {
            return new Comment(<libxmljs.Element>v);
        } else if (type == "cdata") {
            return new CDATA(<libxmljs.Element>v);
        } else if (type == "attribute") {
            return new Attribute(<libxmljs.Attribute>v);
        } else if (type == "pi") {
            return new ProcessingInstruction(<libxmljs.Element>v);
        } else if (type == "dtd") {
            throw new Error("error");
        } else {
            throw new Error("error");
        }
    }
    function constructNodeFromOtherDocument(doc : Document, node: libxmljs.Element | libxmljs.Attribute): InnerNode {
        const type = (<any>node).type();
        if (type == "text") {
            return Text.create(doc, (<libxmljs.Element>node).text());
        } else if (type == "element") {
            const libxmljsNode = (<libxmljs.Element>node);
            const children = libxmljsNode.childNodes().map((v) => constructNodeFromOtherDocument(doc, v) );
            const r = Element.create(doc, libxmljsNode.name(), null );
            libxmljsNode.attrs().forEach((v) => r.attr(v.name(), v.value()) );
            children.forEach((v) => r.addChild(<InnerNode> v));
            return r;
        } else if (type == "comment") {
            return Comment.create(doc, (<libxmljs.Element>node).text());
        } else if (type == "cdata") {
            const cdatas = CDATA.create(doc, (<libxmljs.Element>node).text());
            if(cdatas.length > 1) throw new Error("error");
            return cdatas[0];
        } else if (type == "attribute") {
            throw new Error("error");
            //return Attribute.create(doc, (<libxmljs.Attribute>node).name(), (<libxmljs.Attribute>node).value());
        } else if (type == "pi") {
            throw new Error("error");
        } else if (type == "dtd") {
            throw new Error("error");
        } else {
            throw new Error("error");
        }
    }

    function constructInnerNode(v: libxmljs.Element): InnerNode {
        const type = (<any>v).type();
        if (type == "text") {
            return new Text(<libxmljs.Element>v);
        } else if (type == "element") {
            return new Element(<libxmljs.Element>v);
        } else if (type == "comment") {
            return new Comment(<libxmljs.Element>v);
        } else if (type == "cdata") {
            return new CDATA(<libxmljs.Element>v);
        } else if (type == "pi") {
            return new ProcessingInstruction(<libxmljs.Element>v);
        } else if (type == "dtd") {
            throw new Error("error");
        } else {
            throw new Error("error");
        }
    }
    export class Namespace {
        private _original: libxmljs.Namespace;
        public get original(): libxmljs.Namespace {
            return this._original;
        }
        constructor(__item: libxmljs.Namespace) {
            this._original = __item;
        }
        public get prefix() : string{
            return this.original.prefix();
        }
        public get href() : string{
            return this.original.href();
        }
    }
    export class Element extends InnerNode {
        constructor(__item: libxmljs.Element) {
            super(__item, "element");
        }
        public static create(doc : libxmlts.Document, name : string, content : string | null) : libxmlts.Element {
            if(content == null){
                const node = new libxmljs.Element(doc.doc , name);
                return new libxmlts.Element(node);    
            }else{
                const node = new libxmljs.Element(doc.doc , name, content);
                return new libxmlts.Element(node);    
            }
        }
        public get startTag() : string{
            let attrs ="";
            this.attrs().forEach((v)=>{
                attrs += ` ${v.name}="${v.value}"`
            })
            return `<${this.name}${attrs}>`;
        }
        public get endTag() : string{
            return `</${this.name}>`;
        }
        public defineNamespace(href :string)
        public defineNamespace(prefix :string, href: string)
        public defineNamespace(fst :string, sec?: string) : Namespace {
            if(sec === undefined){
                const ns = this.original.defineNamespace(fst);
                return new libxmlts.Namespace(ns);
            }else{
                const ns = this.original.defineNamespace(fst, sec);
                return new libxmlts.Namespace(ns);
            }
        }
        public child(idx : number) : InnerNode {
            const r = this.original.child(idx);
            if(r !== undefined){
                return constructInnerNode(r);
            }else{
                throw new Error("error")
            }
        }
        public childNodes(): (InnerNode)[] {
            const r: (InnerNode)[] = new Array();
            return this.original.childNodes().map((v) => {
                return constructInnerNode(v);
            })
        }
        public clearChildNodes() : Element {
            this.childNodes().forEach((v)=> v.remove());
            return this;
        }
        public addChild(node : InnerNode | DocumentFragment) : InnerNode{
            if(node instanceof InnerNode){
            const r = this.original.addChild(node.original);
            const resultNode = constructInnerNode(r);
            return resultNode;
            }else {
                const results = this.doc.parseDocumentFragment(node.content).map((v) => this.addChild(v));
                return results[0];
            }
        }
        public addFirstChild(node : InnerNode) : InnerNode{
            if(this.childNodes().length == 0){
                const r = this.original.addChild(node.original);            
                const resultNode = constructInnerNode(r);
                return resultNode;    
            }else{
                return this.childNodes()[0].addPrevSibling(node);
            }
        }
        

        public get name(): string {
            return this.original.name();
        }
        public set name(value: string) {
            this.original.name(value);
        }
        public get text(): string {
            return (<libxmljs.Element>this.original).text();
        }
        public set text(value: string) {
            (<any>this.original).text(value);
        }

        public attr(name: string): libxmlts.Attribute | null
        public attr(name: string, value: string): libxmlts.Attribute | null
        public attr(name: string, value?: string): libxmlts.Attribute | null {
            if (value === undefined) {
                const attr: libxmljs.Attribute | null = this.original.attr(name);
                if (attr != null) {
                    return new libxmlts.Attribute(attr);
                } else {
                    return null;
                }
            } else {
                const attr: libxmljs.Attribute | null = (<any>this.original).attr(name, value);
                if (attr != null) {
                    return new libxmlts.Attribute(attr);
                } else {
                    return null;
                }
            }
        }
        public attrs(): libxmlts.Attribute[] {
            return this.original.attrs().map((v) => new libxmlts.Attribute(v));
        }
        public find(xpath: string)
        public find(xpath: string, ns_url : string)
        public find(xpath: string, ns_url? : string): libxmlts.XMLNode[] {
            if(ns_url !== undefined){
                return this.original.find(xpath, ns_url).map((v) => {
                    return constructNodeItem(v);
                })    
            }else{
                return this.original.find(xpath).map((v) => {
                    return constructNodeItem(v);
                })    
            }
        }
        public get innerXML() : string {
            let tmp = "";
            this.childNodes().forEach((v)=> tmp += v.toString());
            return tmp;
        }

        /*
        public parent() : libxmlts.Document | libxmlts.Element {
            const parent = this.original.parent(); 
            const type = parent.type();
            if(type == "element"){
                return new libxmlts.Element(parent);
            }else{
                return this.doc;
            }
        }
        */
        /*
        public setTextAsCDATA(text: string): void {
            (<any>this.original).cdata(text);
        }
        */
        public get path() {
            return this.original.path();
        }
        public get(xpath: string) : XMLNode | null {
            const result = this.original.get(xpath);
            if(result != null){
                return null;
            }else{
                if(result != undefined){
                    return constructNodeItem(result);
                }else{
                    return null;
                }
            }         
        }
    }
    export class Document {
        private _doc: libxmljs.XMLDocument;
        public get doc(): libxmljs.XMLDocument {
            return this._doc;
        }

        constructor(__item: libxmljs.XMLDocument) {
            this._doc = __item;
        }
        public get root() : libxmlts.Element {
            const r = this.doc.root();
            return new libxmlts.Element(r);
        }
        public find(xpath: string) : libxmlts.XMLNode[]
        public find(xpath: string, ns_url : string) : libxmlts.XMLNode[]
        public find(xpath: string, ns_url? : string): libxmlts.XMLNode[] {
            if(ns_url !== undefined){
                return (<any>this.doc).find(xpath, ns_url).map((v) => {
                    return constructNodeItem(v);
                })    
            }else{
                return this.doc.find(xpath).map((v) => {
                    return constructNodeItem(v);
                })    
            }
        }
        public findAny(xpath: string) : libxmlts.XMLNode | null
        public findAny(xpath: string, ns_url : string) : libxmlts.XMLNode | null
        public findAny(xpath: string, ns_url? : string): libxmlts.XMLNode | null {
            if(ns_url !== undefined){
                const p = this.find(xpath, ns_url);
                return p.length == 0 ? null : p[0];
            }else{
                const p = this.find(xpath);
                return p.length == 0 ? null : p[0];
            }
        }


        public findElements(xpath: string) : libxmlts.Element[]
        public findElements(xpath: string, ns_url : string) : libxmlts.Element[]
        public findElements(xpath: string, ns_url? : string): libxmlts.Element[] {
            if(ns_url !== undefined){
                return <libxmlts.Element[]>this.find(xpath, ns_url).filter((v)=> v instanceof libxmlts.Element);
            }else{
                return <libxmlts.Element[]>this.find(xpath).filter((v)=> v instanceof libxmlts.Element);
            }
        }

        
        public toString(format : boolean = true): string {
            return (<any>this.doc).toString(format);
        }

        public parseDocumentFragment(fragment : string) : InnerNode[]{
            const xml = `<?xml version="1.0" encoding="UTF-8"?><root>${fragment}</root>`
            return libxmljs.parseXml(xml).root().childNodes().map((v)=> constructNodeFromOtherDocument(this, v));
        }
        public createElement(name : string) : libxmlts.Element{
            const r = new libxmljs.Element(this.doc, name, undefined);
            return new libxmlts.Element(r);
        }

    }
    export class Attribute extends XMLNode {
        public get original(): libxmljs.Attribute {
            return <libxmljs.Attribute>super.original;
        }

        constructor(__item: libxmljs.Attribute) {
            super(__item, "attribute");
        }
        public get name(): string {
            return this.original.name();
        }

        public get value(): string {
            return this.original.value();
        }
        public set value(text: string) {
            (<any>this.original).value(text);
        }

    }
    export class DocumentFragment{
        private _content : string;
        constructor(_content: string) {
            this._content = _content;
        }
        public get content() : string {
            return this._content;
        }

    }
    export class Comment extends InnerNode {

        constructor(__item: libxmljs.Element) {
            super(__item, "comment");
        }
        public get text(): string {
            return (<libxmljs.Element>this.original).text();
        }
        public set text(value: string) {
            (<any>this.original).text(value);
        }
        public static create(doc : libxmlts.Document, content : string) : libxmlts.Comment {
            const c = new (<any>libxmljs).Comment(doc.doc, content);
            return new libxmlts.Comment(c);
        }

    }
    export class CDATA extends InnerNode {

        constructor(__item: libxmljs.Element) {
            super(__item, "cdata");
        }

        public get text(): string {
            return (<libxmljs.Element>this.original).text();
        }
        public set text(value: string) {
            (<any>this.original).text(value);
        }
        public static create(doc : libxmlts.Document, content : string) : libxmlts.CDATA[] {
            const node = libxmlts.Element.create(doc , "test", null);
            doc.root.addChild(node);

            (<any>node.original).addCData(content);

            const rawCDATAs = node.original.childNodes().filter((v)=>v.type() == "cdata");
            rawCDATAs.forEach((v) => v.remove() );
            node.remove();
            const cdatas = rawCDATAs.map((v) => new libxmlts.CDATA(v));
            return cdatas;
        }
    }
    export class Text extends InnerNode {

        constructor(__item: libxmljs.Element) {
            super(__item, "text");
        }
        public get text(): string {
            return (<libxmljs.Element>this.original).text();
        }
        public set text(value: string) {
            (<any>this.original).text(value);
        }

        public static create(doc : libxmlts.Document, content : string) : libxmlts.Text {
            const node = libxmlts.Element.create(doc , "test", " ");
            doc.root.addChild(node);

            const textNode: Text = <Text>node.child(0);
            textNode.text = content;
            textNode.remove();
            node.remove();
            return textNode;
        }

    }

    export class ProcessingInstruction extends InnerNode {
        constructor(__item: libxmljs.Element) {
            super(__item, "pi");
        }
        public attr(name: string): string | null {
            const map = PIFunctions.getAttributes((<libxmljs.Element>this.original).text());
            const attr = map.get(name);
            if (attr != undefined) {
                return attr;
            } else {
                return null;
            }
        }
        public attrs() : Map<string, string> {
            const map = PIFunctions.getAttributes((<libxmljs.Element>this.original).text());
            return map;
        }
    }
   
}
export type ProcessingInstructionElement = { target: string, attributes: Map<string, string> };
//export type ProcessingInstructionFunction = (e: ProcessingInstruction, info: Setting) => boolean;
//export type ProcessingInstructionMacroPath = { func: ProcessingInstructionFunction, target: string };

export namespace PIFunctions {
    export function getAttributes(attributeText: string): Map<string, string> {
        const suffix = attributeText;
        const attributesRule = new RegExp(`([\\w]+?)="([^"]*?)"`);
        let attributeLine = suffix.match(attributesRule);
        const map = new Map<string, string>();
        while (attributeLine != null) {
            map.set(attributeLine[1], attributeLine[2]);
            const nextStartPos = attributeLine.index! + attributeLine[0].length;
            attributeLine = attributeLine.input!.substr(nextStartPos).match(attributesRule);
        }
        return map;
    }

    export function getProcessingInstructions(xml: string): ProcessingInstructionElement[] {
        const removingMainXMLRule = new RegExp(`<[^?]`, "g");

        const occurrencePosition = xml.search(removingMainXMLRule);
        const textLength = occurrencePosition == -1 ? xml.length : occurrencePosition;
        const xmlDeclarationText = xml.substr(0, textLength);
        const xmlDeclarationRule = new RegExp(`<\\?([\\S]+?)( .*?)\\?>`);

        let xmlDeclarationLine = xmlDeclarationText.match(xmlDeclarationRule);
        let results: ProcessingInstructionElement[] = new Array();
        while (xmlDeclarationLine != null) {
            const nameStr : string = xmlDeclarationLine[1];
            const map = getAttributes(xmlDeclarationLine[2]);
            /*
            const suffix = xmlDeclarationLine[2];
            const attributesRule = new RegExp(`([\\w]+?)="([^"]*?)"`);
            let attributeLine = suffix.match(attributesRule);
            const map = new Map<string, string>();
            while (attributeLine != null) {
                map.set(attributeLine[1], attributeLine[2]);
                const nextStartPos = attributeLine.index! + attributeLine[0].length;
                attributeLine = attributeLine.input!.substr(nextStartPos).match(attributesRule);
            }
            */

            results.push({ target: nameStr, attributes: map });
            const nextStartPos1 = xmlDeclarationLine.index! + xmlDeclarationLine[0].length;
            xmlDeclarationLine = xmlDeclarationLine.input!.substr(nextStartPos1).match(xmlDeclarationRule);

        }
        return results;
    }

}