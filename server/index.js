const express = require("express");

const api = express();
let head = {
  isTerminal: false,
};

function list(trie) {
  const keys = Object.keys(trie)
  let returnArray = []
  if (trie.isTerminal) {
    returnArray.push("");
  }
  keys.shift(); // Remove isTerminal (the first element)
  keys.forEach((key) => returnArray.push(...list(trie[key])));
  return returnArray;
}

api.put("/:keyword", (req, res) => {
  const keyword = req.params.keyword;
  let currentNode = head;
  for (const char of keyword) {
    if (currentNode[char] == null) {
      currentNode[char] = {isTerminal: false};
    }
    currentNode = currentNode[char];
  }
  currentNode.isTerminal = true;
  res.send("${keyword} successfully added to trie");
});

api.get("/:keyword", (req, res) => {
  const keyword = req.params.keyword;
  let currentNode = head;
  for (const char of keyword) {
    if (currentNode[char] == null) {
      res.json({result: false});
    }
    currentNode = currentNode[char];
  }
  res.json({result: currentNode.isTerminal});
});

api.listen(8000, () => {
  console.log("Server is listening on port 8000");
})

exports.list = list;