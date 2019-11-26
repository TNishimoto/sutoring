declare namespace StrFunctions {
    namespace LogicGraphTable {
        function setRow(table: GraphTableSVG.LogicTable, ithRow: number, name: string, values: (number | string)[]): void;
        function setColumn(table: GraphTableSVG.LogicTable, ithColumn: number, name: string, values: (number | string)[]): void;
        type LogicTableLine = {
            name: string;
            values: (number | string)[];
        };
        function createLogicTable(lines: LogicTableLine[] | LogicTableLine, option?: {
            isRowLines?: boolean;
            withIndex?: boolean;
            zeroBased?: boolean;
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
    namespace DistinctSubstrings {
        function sort(strings: string[]): void;
        function enumerate(text: string): string[];
        function enumerateWithOccurrences(text: string): Map<string, number[]>;
    }
    namespace MinimalUniqueSubstrings {
        function enumerate(text: string): string[];
    }
}
declare namespace StrFunctions {
    namespace SuffixArray {
        function construct(str: string, zero_based?: boolean): number[];
        type SATableOption = {
            zeroBased?: boolean;
            withSA?: boolean;
            withLCP?: boolean;
            withBWT?: boolean;
            withIndex?: boolean;
        };
        function constructSATable(text: string, option?: SATableOption): GraphTableSVG.LogicTable;
    }
    namespace LongestCommonPrefixArray {
        function construct(text: string): number[];
        function constructLCPTable(text: string, option?: SuffixArray.SATableOption): GraphTableSVG.LogicTable;
    }
    namespace BWT {
        function construct(text: string): string[];
        function constructBWTTable(text: string, option?: SuffixArray.SATableOption): GraphTableSVG.LogicTable;
    }
}
