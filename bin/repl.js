#! /usr/bin/env node

const opener = require("opener")
console.log("Hello world, sutoring.js!")
console.log("This is a REPL of node.js.")
console.log("The modules in sutoring.js are stored in variable 'sutoring'.")
console.log("You can see the modules by executing 'commands()'");

const sutoring = require("../dist/index");

function commands() {
    console.log(sutoring)
    opener("https://tnishimoto.github.io/sutoring/typedoc/globals.html")
}
/*
function browse(command) {
    const b = sutoring[command] !== undefined;
    Console,
    LZ78, LZ77WithSelfReference,

    SuffixArray, MinimalUniqueSubstrings, DistinctSubstrings, MaximalRepeats, MinimalRepeats,
    Trie, SuffixTrie, SuffixTree,
    BWT, RLBWT, SAonRLBWT, Debug, LCPArray,
    FibonacciSequence, ThueMorseSequence
    if (b) {
        switch (command) {
            case "Console":
                break;
            case "LZ78":
                break;
            case "LZ77WithSelfReference":
                break;
            case "SuffixArray":
                break;
            case "MinimalUniqueSubstrings":
                break;
            case "DistinctSubstrings":
                break;
            case "MaximalRepeats":
                break;
            case "Trie":
                break;
            case "SuffixTrie":
                break;
            case "SuffixTree":
                break;
            case "BWT":
                opener("https://tnishimoto.github.io/sutoring/typedoc/modules/_src_permutations_bwt_.html")
                break;
            case "RLBWT":
                break;
            case "SAonRLBWT":
                break;
            case "Debug":
                break;
            case "LCPArray":
                break;
            case "FibonacciSequence":
                break;
            case "ThueMorseSequence":
                break;
            default:
                break;

        }
    } else {
        console.log(`${command} is not stored in sutoring.`)
    }
}
*/

const replServer = require('repl').start('>>> ');
replServer.context.sutoring = sutoring;
replServer.context.commands = commands;
//replServer.context.browse = browse;