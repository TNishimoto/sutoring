namespace StrFunctions {

    export namespace LogicGraphTable {
        export function setRow(table: GraphTableSVG.LogicTable, ithRow: number, name: string, values: (number | string)[]) {
            table.cells[ithRow][0].text = name;
            values.forEach((v, i) => { table.cells[ithRow][i + 1].text = v.toString() })
        }
        export function setColumn(table: GraphTableSVG.LogicTable, ithColumn: number, name: string, values: (number | string)[]) {
            table.cells[0][ithColumn].text = name;
            values.forEach((v, i) => { table.cells[i + 1][ithColumn].text = v.toString() })
        }
        export type LogicTableLine = { name: string, values: (number | string)[] }

        export function createLogicTable(lines: LogicTableLine[],
            option: { isRowLines: boolean }): GraphTableSVG.LogicTable {
            let maximalLineLength = 0;
            lines.forEach((v) => {
                if (maximalLineLength < v.values.length) {
                    maximalLineLength = v.values.length
                }
            }
            )
            const rowCount = option.isRowLines ? lines.length : maximalLineLength + 1;
            const columnCount = option.isRowLines ? maximalLineLength + 1 : lines.length;
            const table: GraphTableSVG.LogicTable = new GraphTableSVG.LogicTable({ rowCount: rowCount, columnCount: columnCount });

            if (option.isRowLines) {
                lines.forEach((v, i) => {
                    StrFunctions.LogicGraphTable.setRow(table, i, v.name, v.values );
                })
            } else {
                lines.forEach((v, i) => {
                    StrFunctions.LogicGraphTable.setColumn(table, i, v.name, v.values );
                })

            }
            return table;
        }
    }


}