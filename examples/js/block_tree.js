"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sutoring = require("../../dist/index");
//const text = "aba";
const text = "abaababaabaababaababaabaababaaba";
//const text = "abaababaabaababaababaabaababaabaababaababaabaababaababaabaababaabaababaababaabaababaabaababaababaaba";
const tree = Sutoring.Trees.BlockTree.makeBlockTree(text);
const logicTree = Sutoring.Trees.BlockTree.convert(tree);
Sutoring.Console.graph(logicTree);
