
# sutoring

sutoring.js provides many functions and those visualizations for strings.  
At the moment, this library supports the following functions:

- [LZ78](https://TNishimoto.github.io/sutoring/local_test/000_lz78.html "LZ78")
- [Suffix Array](https://TNishimoto.github.io/sutoring/local_test/001_suffix_array.html "Suffix Array")
- [Minimal Unique Substrings](https://TNishimoto.github.io/sutoring/local_test/002_minimal_unique_substrings.html "Minimal Unique Substrings")
- [Sequence](https://TNishimoto.github.io/sutoring/local_test/003_sequence.html "Sequence")
- [Trie](https://TNishimoto.github.io/sutoring/local_test/004_trie.html "Trie")
- [Suffix Trie](https://TNishimoto.github.io/sutoring/local_test/005_suffix_trie.html "Suffix Trie")
- [BWT](https://TNishimoto.github.io/sutoring/local_test/006_bwt.html "BWT")
- [RLBWT](https://TNishimoto.github.io/sutoring/local_test/007_rlbwt.html "RLBWT")

# Documents
- [Reference](https://TNishimoto.github.io/sutoring/typedoc/index.html "Reference")

# Insutall

npm install -g sutoring

# Examples(node.js)

> sutoring  
Hello world, sutoring.js!  
This is a REPL of node.js.  
Sutoring.js modules are stored in variable 'sutoring'  
\>\>\> sutoring.LZ78.factorize("abababba$")  
[ 'a', 'b', 'ab', 'abb', 'a$' ]
\>\>\> const table78 = sutoring.LZ78.constructLZ78Table("abababab$")  
\>\>\> sutoring.Console.table(table78)  
\>\>\> const trie78 = sutoring.LZ78.constructLZ78Trie("abababab$")  
\>\>\> sutoring.Console.graph(trie78)