"use strict";
var StrFunctions;
(function (StrFunctions) {
    let LogicGraphTable;
    (function (LogicGraphTable) {
        function setRow(table, ithRow, name, values) {
            table.cells[ithRow][0].text = name;
            values.forEach((v, i) => { table.cells[ithRow][i + 1].text = v.toString(); });
        }
        LogicGraphTable.setRow = setRow;
        function setColumn(table, ithColumn, name, values) {
            table.cells[0][ithColumn].text = name;
            values.forEach((v, i) => { table.cells[i + 1][ithColumn].text = v.toString(); });
        }
        LogicGraphTable.setColumn = setColumn;
        function createLogicTable(lines, option) {
            let maximalLineLength = 0;
            lines.forEach((v) => {
                if (maximalLineLength < v.values.length) {
                    maximalLineLength = v.values.length;
                }
            });
            const rowCount = option.isRowLines ? lines.length : maximalLineLength + 1;
            const columnCount = option.isRowLines ? maximalLineLength + 1 : lines.length;
            const table = new GraphTableSVG.LogicTable({ rowCount: rowCount, columnCount: columnCount });
            if (option.isRowLines) {
                lines.forEach((v, i) => {
                    StrFunctions.LogicGraphTable.setRow(table, i, v.name, v.values);
                });
            }
            else {
                lines.forEach((v, i) => {
                    StrFunctions.LogicGraphTable.setColumn(table, i, v.name, v.values);
                });
            }
            return table;
        }
        LogicGraphTable.createLogicTable = createLogicTable;
    })(LogicGraphTable = StrFunctions.LogicGraphTable || (StrFunctions.LogicGraphTable = {}));
})(StrFunctions || (StrFunctions = {}));
var StrFunctions;
(function (StrFunctions) {
    let LZ78;
    (function (LZ78) {
        function preprocess(text) {
            let nodeCount = 0;
            const root = { id: nodeCount++, children: new Map() };
            let currentNode = root;
            let factors = new Array();
            const nodes = [root];
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (currentNode.children.has(char)) {
                    currentNode = currentNode.children.get(char);
                }
                else {
                    factors.push({ id: currentNode.id, nextChar: char });
                    const newNode = { id: nodeCount++, children: new Map() };
                    currentNode.children.set(char, newNode);
                    currentNode = root;
                    nodes.push(newNode);
                }
            }
            if (currentNode != root) {
                factors.push({ id: currentNode.id, nextChar: "" });
                const newNode = { id: nodeCount++, children: new Map() };
                currentNode.children.set("", newNode);
                currentNode = root;
                nodes.push(newNode);
            }
            return [factors, nodes];
        }
        function extract(factors) {
            const r = new Array();
            factors.forEach((f, i) => {
                if (f.id == 0) {
                    r.push(f.nextChar);
                }
                else {
                    const str = r[f.id - 1] + f.nextChar;
                    r.push(str);
                }
            });
            return r;
        }
        function factorize(text) {
            const p = preprocess(text);
            const parsedStrings = extract(p[0]);
            return parsedStrings;
        }
        LZ78.factorize = factorize;
        function compress(text) {
            const p = preprocess(text);
            return p[0];
        }
        LZ78.compress = compress;
        function constructLZ78Table(text) {
            const comp = compress(text);
            return StrFunctions.LogicGraphTable.createLogicTable([
                { name: "index", values: comp.map((v, i) => i) },
                { name: "id", values: comp.map((v, i) => v.id) },
                { name: "character", values: comp.map((v, i) => v.nextChar) }
            ], { isRowLines: true });
        }
        LZ78.constructLZ78Table = constructLZ78Table;
        function constructLZ78Trie(text) {
            const nodes = preprocess(text)[1];
            const graphNodes = nodes.map((v) => new GraphTableSVG.LogicTree());
            nodes.forEach((v, i) => {
                graphNodes[v.id].vertexText = (v.id).toString();
                v.children.forEach((value, key) => {
                    const child = graphNodes[value.id];
                    child.parentEdgeText = key;
                    graphNodes[v.id].children.push(child);
                });
            });
            return graphNodes[0];
        }
        LZ78.constructLZ78Trie = constructLZ78Trie;
    })(LZ78 = StrFunctions.LZ78 || (StrFunctions.LZ78 = {}));
})(StrFunctions || (StrFunctions = {}));
var StrFunctions;
(function (StrFunctions) {
    let SuffixArray;
    (function (SuffixArray) {
        function construct(str, zero_based = true) {
            const arr = new Array(str.length);
            for (let i = 0; i < str.length; i++) {
                arr[i] = i;
            }
            const func = function (item1, item2) {
                for (let i = 0; i <= str.length; i++) {
                    if (item1 + i >= str.length || item2 + i >= str.length)
                        break;
                    if (str.charAt(item1 + i) < str.charAt(item2 + i)) {
                        return -1;
                    }
                    else if (str.charAt(item1 + i) > str.charAt(item2 + i)) {
                        return 1;
                    }
                }
                if (item1 == item2) {
                    return 0;
                }
                else {
                    return item1 < item2 ? 1 : -1;
                }
            };
            arr.sort(func);
            if (zero_based) {
                return arr;
            }
            else {
                return arr.map((v) => v + 1);
            }
        }
        SuffixArray.construct = construct;
        function constructSATable(text, option = { zero_based: true, withLCP: false, withBWT: false }) {
            if (option.zero_based == undefined)
                option.zero_based = true;
            if (option.withSA == undefined)
                option.withSA = true;
            if (option.withLCP == undefined)
                option.withLCP = false;
            if (option.withBWT == undefined)
                option.withBWT = false;
            const sa = construct(text);
            const view_sa = option.zero_based ? sa : sa.map((v) => v + 1);
            const indexes = option.zero_based ? sa.map((v, i) => i) : sa.map((v, i) => i + 1);
            const lcpArray = LongestCommonPrefixArray.construct(text);
            const bwt = BWT.construct(text).map((v) => v);
            const arrays = new Array(0);
            arrays.push({ name: "Index", values: indexes });
            if (option.withSA) {
                arrays.push({ name: "SA", values: view_sa });
            }
            if (option.withLCP) {
                arrays.push({ name: "LCP", values: lcpArray });
            }
            if (option.withBWT) {
                arrays.push({ name: "BWT", values: bwt });
            }
            arrays.push({ name: "Suffix", values: sa.map((v) => text.substr(v)) });
            return StrFunctions.LogicGraphTable.createLogicTable(arrays, { isRowLines: false });
        }
        SuffixArray.constructSATable = constructSATable;
    })(SuffixArray = StrFunctions.SuffixArray || (StrFunctions.SuffixArray = {}));
    let LongestCommonPrefixArray;
    (function (LongestCommonPrefixArray) {
        function lcp(text1, text2) {
            const max = text1.length < text2.length ? text2.length : text1.length;
            for (let i = 0; i < max; i++) {
                if (text1[i] != text2[i])
                    return i;
            }
            return max;
        }
        function construct(text) {
            const sa = SuffixArray.construct(text);
            const lcpArray = sa.map((_, i) => {
                if (i == 0) {
                    return 0;
                }
                else {
                    return lcp(text.substr(sa[i]), text.substr(sa[i - 1]));
                }
            });
            return lcpArray;
        }
        LongestCommonPrefixArray.construct = construct;
    })(LongestCommonPrefixArray = StrFunctions.LongestCommonPrefixArray || (StrFunctions.LongestCommonPrefixArray = {}));
    let BWT;
    (function (BWT) {
        function getCircularString(text, nth) {
            return text.substr(nth) + text.substr(0, nth);
        }
        function compare(text, ith, jth) {
            const ithStr = getCircularString(text, ith);
            const jthStr = getCircularString(text, jth);
            if (ithStr == jthStr) {
                return ith - jth;
            }
            else {
                if (ithStr < jthStr) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
        }
        function construct(text) {
            const r = Array.from(Array(text.length).keys());
            r.sort((a, b) => {
                return compare(text, a, b);
            });
            console.log(r);
            return r.map((v) => {
                if (v == 0) {
                    return text[text.length - 1];
                }
                else {
                    return text[v - 1];
                }
            });
        }
        BWT.construct = construct;
    })(BWT = StrFunctions.BWT || (StrFunctions.BWT = {}));
})(StrFunctions || (StrFunctions = {}));
//# sourceMappingURL=StrFunctions.js.map