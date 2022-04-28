const request = require("../request.js");

exports.command = 'delete <keyword>'

exports.describe = 'delete a keyword from the trie'

exports.handler = (argv) => {
  request.deleteKeyword(argv.keyword);
}