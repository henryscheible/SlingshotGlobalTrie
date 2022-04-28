const request = require("../request.js");

exports.command = 'find <keyword>'

exports.describe = 'check whether <keyword> is present in trie'

exports.handler = (argv) => {
  request.getKeyword(argv.keyword);
}