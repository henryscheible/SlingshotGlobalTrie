# Trie Client
## Installation
The client is a Node package hosted on the npm registry, so it can be installed with the following command:
```shell
$ npm i -g @henryscheible/trieclient@1.2.0
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

### Put Keyword
```shell
$ triecli put <keyword>
Successfully added <keyword> to trie
```

### Find Keyword
```shell
$ triecli find <keyword>
```

This command will print `true` if the keyword is found and `false` if the keyword is not found

### Delete Keyword
```shell
$ triecli delete <keyword>
```

### Autocomplete Keyword
```shell
$ triecli autocomplete <prefix>
```
This command will print out all keywords starting with `<prefix>`, each on their own line. Example:
```shell
$ triecli autocomplete h
hello
hungry
```

### Display Trie
```shell
$ triecli list
```
This command will print out all keywords in a trie one line at a time.
