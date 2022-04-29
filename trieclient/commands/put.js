const client = require("../client.js");

exports.command = 'put <keyword>'

exports.describe = 'add a keyword to the trie'

exports.handler = (argv) => {
  client.putKeyword(argv.keyword);
}