# Server
The API server is written with Express.js and deployed to GCloud App Engine. The client interacts with it by making HTTP requests and processing the responses.

The trie is stored in memory, not in any persistent way, so restarting or redeploying the server will wipe all data from the trie.

Production API Endpoint: [`https://trieserver-henryscheible.uc.r.appspot.com/`](https://trieserver-henryscheible.uc.r.appspot.com/)
## API Specification
| HTTP Method | Path               | Description                                 | Response                                                                                   |
|-------------|--------------------|---------------------------------------------|--------------------------------------------------------------------------------------------|
| GET         | `/`                | List all keywords in trie                   | `{ result: ["<keyword 1>", "<keyword2>", ...]}`                                            |
| GET         | `/<keyword>`       | Check whether `<keyword>` is in trie        | `{ result: true}` or `{ result: false }`                                                   |
| GET         | `/autocomplete/<keyword>` | List all keywords starting with `<keyword>` | `{ suggestions: ["<keyword 1>", "<keyword2>", ...]}`                                       |                                                 |
| PUT         | `/<keyword>`       | Add `<keyword>` to the trie                 | `{ succeeded: true }`                                                                      |
| DELETE      | `/<keyword>`       | Remove `<keyword>` from the trie            | `{ suceeded: true }` or `{ suceeded: false }` (If the keyword was not already in the trie) |
| DELETE      | `/`                | Reset the trie to an empty state            | `{ suceeded: true }`                                                                        |


## Local Development
To speed up development, the server can also be run locally by calling
```shell
$ npm run start
```
The server will listen on port 8000 for incoming requests. To use the client with the server for local testing, call the client with the `--url` option and pass the url `http://localhost:8000/` (see client docs for details).

## Testing
Local tests of the api can be run with the following command:
```shell
$ npm run test
```
This will run the server on `localhost:8000`, so these tests will NOT work if the server is already running locally.
