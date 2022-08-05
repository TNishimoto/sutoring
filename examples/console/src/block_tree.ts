import * as sutoring from "sutoring"

const text = "abaababaabaababaababaabaababaaba";
const tree = sutoring.Trees.BlockTree.constructBlockTree(text);
const logicTree = sutoring.Trees.BlockTree.toLogicTree(tree);
sutoring.Console.graph(logicTree);
