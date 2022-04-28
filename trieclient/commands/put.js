const request = require("../request.js");

exports.command = 'put <keyword>'

exports.describe = 'add a keyword to the trie'

exports.handler = (argv) => {
  request.putKeyword(argv.keyword);
}