"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sutoring = require("../../../dist/index");
//const text = "aba";
const text = "abaababaabaababaababaabaababaaba";
//const text = "abaababaabaababaababaabaababaabaababaababaabaababaababaabaababaabaababaababaabaababaabaababaababaaba";
const tree = sutoring.Trees.BlockTree.constructBlockTree(text);
const logicTree = sutoring.Trees.BlockTree.toLogicTree(tree);
//logicTree.graphOption.drawingFunction = undefined;
sutoring.Console.graph(logicTree);
