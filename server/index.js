const express = require("express");
const api = express();


exports.head = {
  isTerminal: false,
};

function list(trie) {
  const keys = Object.keys(trie)
  let returnArray = []
  if (trie.isTerminal) {
    returnArray.push("");
  }
  keys.shift(); // Remove isTerminal (the first element)
  keys.forEach((key) => returnArray.push(...(list(trie[key]).map((substr) => key + substr))));
  return returnArray;
}

api.put("/:keyword", (req, res) => {
  const keyword = req.params.keyword;
  let currentNode = exports.head;
  for (const char of keyword) {
    if (currentNode[char] == null) {
      currentNode[char] = {isTerminal: false};
    }
    currentNode = currentNode[char];
  }
  currentNode.isTerminal = true;
  res.json({succeeded: true});
});

api.get("/:keyword", (req, res) => {
  const keyword = req.params.keyword;
  let currentNode = exports.head;
  for (const char of keyword) {
    if (currentNode[char] === undefined) {
      res.json({result: false});
      return;
    }
    currentNode = currentNode[char];
  }
  res.json({result: currentNode.isTerminal});
});

api.get("/autocomplete/:keyword", (req, res) => {
  const keyword = req.params.keyword;
  let currentNode = exports.head;
  for (const char of keyword) {
    if (currentNode[char] == null) {
      res.json({suggestions: []});
    }
    currentNode = currentNode[char];
  }
  res.json({suggestions: list(currentNode).map((x) => keyword + x)});
});

api.delete("/:keyword", (req, res) => {
  const keyword = req.params.keyword;
  let currentNode = exports.head;
  for (const char of keyword) {
    if (currentNode[char] == null) {
      res.status(500).json({error: `${keyword} not present in trie`, succeeded: false});
    }
    currentNode = currentNode[char];
  }
  if (currentNode.isTerminal) {
    currentNode.isTerminal = false;
    res.json({succeeded: true})
  } else {
    res.status(500).json({error: `${keyword} not present in trie`, succeeded: false});
  }
})

api.get("/", (req, res) => {
  res.json({result: list(exports.head)});
});

const PORT = process.env.PORT || 8000;

api.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

exports.list = list;
exports.api = api; // for testing