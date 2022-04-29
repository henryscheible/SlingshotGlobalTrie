const axios = require("axios");

exports.log = console.log;
exports.error = console.error;

exports.putKeyword = (url, keyword) => {
  axios
    .put(`${url}${keyword}`)
    .then(res => {
      if (res.data.succeeded === undefined) {
        exports.error("Malformed response");
      } else if (res.data.succeeded) {
        exports.log(`Successfully added ${keyword} to trie`);
      } else {
        exports.error(`Request Failed`);
      }
    })
    .catch(() => {
      exports.error("Could not connect to server");
    })
}

exports.getKeyword = (url, keyword) => {
  axios
    .get(`${url}${keyword}`)
    .then(res => {
      if (res.data.result === undefined) {
        exports.error("Malformed response");
      } else {
        exports.log(res.data.result);
      }
    })
    .catch(() => {
      exports.error("Could not connect to server");
    })
}

exports.getAutocomplete = (url, keyword) => {
  axios
    .get(`${url}autocomplete/${keyword}`)
    .then(res => {
      if (res.data.suggestions === undefined) {
        exports.error("Malformed response");
      } else {
        if (res.data.suggestions.length === 0) {
          exports.log("No suggestions");
        } else {
          for (const suggestion of res.data.suggestions) {
            exports.log(suggestion);
          }
        }
      }
    })
    .catch(() => {
      exports.error("Could not connect to server");
    })
}

exports.getTrie = (url) => {
  axios
    .get(url)
    .then(res => {
      if (res.data.result === undefined) {
        exports.error("Malformed response");
      } else {
        if (res.data.result.length === 0) {
          exports.log("Trie empty");
        } else {
          for (const keyword of res.data.result) {
            exports.log(keyword);
          }
        }
      }
    })
    .catch(() => {
      exports.error("Could not connect to server");
    })
}

exports.deleteKeyword = (url, keyword) => {
  axios
    .delete(`${url}${keyword}`)
    .then(res => {
      if (res.data.succeeded === undefined) {
        exports.error("Malformed response");
      } else if (res.data.succeeded) {
        exports.log("Delete successful");
      } else {
        exports.error("Delete unsuccessful");
      }
    })
    .catch(() => {
      exports.error("Could not connect to server");
    })
}