import * as sutoring from "../../dist/index"

//const text = "aba";
const text = "abaababaabaababaababaabaababaaba";

//const text = "abaababaabaababaababaabaababaabaababaababaabaababaababaabaababaabaababaababaabaababaabaababaababaaba";

const tree = sutoring.Trees.BlockTree.makeBlockTree(text);
const logicTree = sutoring.Trees.BlockTree.convert(tree);
//logicTree.graphOption.drawingFunction = undefined;
sutoring.Console.graph(logicTree);