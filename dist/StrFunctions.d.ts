declare namespace StrFunctions {
    namespace LogicGraphTable {
        function setRow(table: GraphTableSVG.LogicTable, ithRow: number, name: string, values: (number | string)[]): void;
        function setColumn(table: GraphTableSVG.LogicTable, ithColumn: number, name: string, values: (number | string)[]): void;
        type LogicTableLine = {
            name: string;
            values: (number | string)[];
        };
        function createLogicTable(lines: LogicTableLine[], option: {
            isRowLines: boolean;
        }): GraphTableSVG.LogicTable;
    }
}
declare namespace StrFunctions {
    namespace LZ78 {
        type LZ78Factor = {
            id: number;
            nextChar: string;
        };
        type LZ78Node = {
            id: number;
            children: Map<string, LZ78Node>;
        };
        function factorize(text: string): string[];
        function compress(text: string): LZ78Factor[];
        function constructLZ78Table(text: string): GraphTableSVG.LogicTable;
        function constructLZ78Trie(text: string): GraphTableSVG.LogicTree;
    }
}
declare namespace StrFunctions {
    namespace SuffixArray {
        function construct(str: string, zero_based?: boolean): number[];
        function constructSATable(text: string, option?: {
            zero_based?: boolean;
            withSA?: boolean;
            withLCP?: boolean;
            withBWT?: boolean;
        }): GraphTableSVG.LogicTable;
    }
    namespace LongestCommonPrefixArray {
        function construct(text: string): number[];
    }
    namespace BWT {
        function construct(text: string): string[];
    }
}
