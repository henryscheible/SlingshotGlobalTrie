const request = require("../client.js");

exports.command = 'list'

exports.describe = 'list all keywords in the trie'

exports.handler = (argv) => {
  request.getTrie(argv.url);
}