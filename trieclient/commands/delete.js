const request = require("../client.js");

exports.command = 'delete <keyword>'

exports.describe = 'delete a keyword from the trie'

exports.handler = (argv) => {
  request.deleteKeyword(argv.url, argv.keyword);
}