const axios = require("axios");

exports.log = console.log;
exports.error = console.error;

exports.putKeyword = (keyword) => {
  axios
    .put(`http://localhost:8000/${keyword}`)
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

exports.getKeyword = (keyword) => {
  axios
    .get(`http://localhost:8000/${keyword}`)
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

exports.getAutocomplete = (keyword) => {
  axios
    .get(`http://localhost:8000/autocomplete/${keyword}`)
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

exports.getTrie = () => {
  axios
    .get(`http://localhost:8000/`)
    .then(res => {
      if (res.data.result === undefined) {
        return({error: "Malformed response"});
      } else {
        let returnStr = "";
        for (const keyword of res.data.result) {
          returnStr += keyword + ", ";
        }
        return({log: returnStr.slice(0, -2)}); // remove trailing comma
      }
    })
    .catch(error => {
      return({error: error});
    })
}

exports.deleteKeyword = (keyword) => {
  axios
    .delete(`http://localhost:8000/delete/${keyword}`)
    .then(res => {
      if (res.data.succeeded === undefined) {
        return({error: "Malformed response"});
      } else if (res.data.succeeded) {
        return({log: "delete successful"});
      } else {
        return({error: "delete unsuccessful"});
      }
    })
    .catch(error => {
      return({error: error});
    })
}