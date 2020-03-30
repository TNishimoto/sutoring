import * as Sutoring from "../../dist/index"

//const text = "aba";
const text = "abaababaabaababaababaabaababaaba";

//const text = "abaababaabaababaababaabaababaabaababaababaabaababaababaabaababaabaababaababaabaababaabaababaababaaba";

const tree = Sutoring.Trees.BlockTree.makeBlockTree(text);
const logicTree = Sutoring.Trees.BlockTree.convert(tree);
//logicTree.graphOption.drawingFunction = undefined;
Sutoring.Console.graph(logicTree);