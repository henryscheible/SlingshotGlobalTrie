# Trie Client
## Installation
The client is a Node package hosted on the npm registry, so it can be installed with the following command:
```shell
$ npm i -g @henryscheible/trieclient@1.0.0
```
## Usage
### Help 
Usage information  can be shown by invoking the `--help` option:
```shell
$ triecli --help
triecli [command]

Commands:
  triecli put <keyword>           add a keyword to the trie
  triecli delete <keyword>        delete a keyword from the trie
  triecli autocomplete <keyword>  find keywords in trie that start with
                                  <keyword>
  triecli list                    list all keywords in the trie
  triecli find <keyword>          check whether <keyword> is present in trie

Options:
  --version  Show version number                                       [boolean]
  --url      the api url to connect to
                                    [string] [default: "http://localhost:8000/"]
  --help     Show help                                                 [boolean]
```

## Put Keyword
```shell
$ triecli put <keyword>
Successfully added <keyword> to trie
```