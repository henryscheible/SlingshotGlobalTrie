const argv = require("yargs/yargs")(process.argv.slice(2))
  .command(require("./commands/put.js"))
  .command(require("./commands/delete.js"))
  .command(require("./commands/autocomplete.js"))
  .command(require("./commands/list.js"))
  .command(require("./commands/find.js"))
  .help().argv;