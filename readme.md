
# sutoring

sutoring.js provides many functions and those visualizations for strings.  
At the moment, this library supports the following functions:

- [LZ78](https://codepen.io/mklemma/details/VwvwQzY "LZ78")
- [Suffix Array](https://codepen.io/mklemma/details/dyYPMoL "Suffix Array")
- [Minimal Unique Substrings](https://codepen.io/mklemma/details/qBOEZOL "Minimal Unique Substrings")
- [Sequence](https://codepen.io/mklemma/details/jObEqWm "Sequence")
- [Trie](https://codepen.io/mklemma/details/XWmJdXq "Trie")
- [Suffix Trie](https://codepen.io/mklemma/details/GRpgZZg "Suffix Trie")
- [BWT](https://codepen.io/mklemma/details/KKdwzzq "BWT")
- [Block Tree](https://codepen.io/mklemma/details/WNQXNeb "Block Tree")
- [Substring Complexity δ](https://codepen.io/mklemma/pen/bGoQEBY "Substring Complexity δ")


# Documents
- [Reference](https://TNishimoto.github.io/sutoring/typedoc/index.html "Reference")

# Install

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