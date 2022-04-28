const request = require("../request.js");

exports.command = 'list'

exports.describe = 'list all keywords in the trie'

exports.handler = () => {
  request.getTrie();
}