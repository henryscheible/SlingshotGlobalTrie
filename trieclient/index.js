#!/user/bin/env node

require("yargs/yargs")(process.argv.slice(2))
  .option("url", {
    describe: "the api url to connect to",
    type: "string",
    default: "http://localhost:8000/"
  })
  .command(require("./commands/put.js"))
  .command(require("./commands/delete.js"))
  .command(require("./commands/autocomplete.js"))
  .command(require("./commands/list.js"))
  .command(require("./commands/find.js"))
  .help().argv;