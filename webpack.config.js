//console.log(`Rootpath: ${__dirname}`)
const path = require("path");
module.exports = {
    mode: 'development',
    entry: './src/index.ts', //ファイルをまとめる際のエントリーポイント
    output: {
        library: "Sutoring",
        path: __dirname,
        filename: 'docs/sutoring.js' //まとめた結果出力されるファイル名
    },
    resolve: {
        extensions: ['.ts', '.js'], //拡張子がtsだったらTypescirptでコンパイルする
        alias: {
            logic_index: path.resolve(__dirname, "../GraphTableSVG/src/object/logic/index"),

            console: path.resolve(__dirname, "../GraphTableSVG/src/options/console"),
            ggraph: path.resolve(__dirname, "../GraphTableSVG/src/object/g_graph")

        }
        //alias: {
        //    logic_table: path.resolve(__dirname, "src/options/logic_table"),
        //    logic_tree: path.resolve(__dirname, "src/options/logic_tree")
        // }

    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader' //ts-loader使うよ
        }]
    }
}