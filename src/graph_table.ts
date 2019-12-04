    import {LogicTable} from "logic_table"
    import {LogicTree} from "logic_tree"

    /**
     * LogicGraphTable namespace provides snippets for LogicTable, LogicTable, and LogicTree classes.
     */
    export namespace LogicGraphTable {
        export function setRow(table: LogicTable, ithRow: number, name: string, values: (number | string)[]) {
            table.cells[ithRow][0].text = name;
            values.forEach((v, i) => { table.cells[ithRow][i + 1].text = v.toString() })
        }
        export function setColumn(table: LogicTable, ithColumn: number, name: string, values: (number | string)[]) {
            table.cells[0][ithColumn].text = name;
            values.forEach((v, i) => { table.cells[i + 1][ithColumn].text = v.toString() })
        }
        export type LogicTableLine = { name: string, values: (number | string)[] }

        export function createLogicTable(lines: LogicTableLine[] | LogicTableLine,
            option?: { isRowLines?: boolean, withIndex?: boolean, zeroBased? : boolean }): LogicTable {
            if (option == undefined) option = {};
            if (option.isRowLines == undefined) option.isRowLines = true;
            if (option.withIndex == undefined) option.withIndex = false;
            if (lines instanceof Array) {


                let maximalLineLength = 0;
                lines.forEach((v) => {
                    if (maximalLineLength < v.values.length) {
                        maximalLineLength = v.values.length
                    }
                }
                )
                if(option.withIndex){
                    const newLines : LogicTableLine[] = new Array();
                    newLines.push({name : "Index", values : Array.from(Array(maximalLineLength).keys()).map((i) => option!.zeroBased ? i : (i+1)) })
                    lines.forEach((v) => newLines.push(v));
                    option.withIndex = false;
                    return createLogicTable(newLines, option);
                }
                const rowCount = option.isRowLines ? lines.length : maximalLineLength + 1;
                const columnCount = option.isRowLines ? maximalLineLength + 1 : lines.length;
                const table: LogicTable = new LogicTable({ rowCount: rowCount, columnCount: columnCount });

                if (option.isRowLines) {
                    lines.forEach((v, i) => {
                        LogicGraphTable.setRow(table, i, v.name, v.values);
                    })
                } else {
                    lines.forEach((v, i) => {
                        LogicGraphTable.setColumn(table, i, v.name, v.values);
                    })

                }
                return table;
            } else {
                return createLogicTable([lines], option);
            }
        }
    }
    //export { LogicTable, LogicTree}


