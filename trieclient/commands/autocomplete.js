const request = require("../client.js");

exports.command = 'autocomplete <keyword>'

exports.describe = 'find keywords in trie that start with <keyword>'

exports.handler = (argv) => {
  request.getAutocomplete(argv.keyword);
}