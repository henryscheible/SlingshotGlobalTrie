const axios = require("axios");

exports.putKeyword = (keyword) => {
  axios
    .put(`http://localhost:8000/${keyword}`)
    .then(res => {
      if (res.data.succeeded === undefined) {
        console.error("Malformed response");
      } else if (res.data.succeeded) {
        console.log(`Successfully added ${keyword} to trie`);
      } else {
        console.error(`Request Failed`);
      }
    })
    .catch(() => {
      console.error("Could not connect to server");
    })
}

exports.getKeyword = (keyword) => {
  axios
    .get(`http://localhost:8000/${keyword}`)
    .then(res => {
      if (res.data.result === undefined) {
        console.error("Malformed response");
      } else {
        console.log(res.data.result);
      }
    })
    .catch(error => {
      console.error(error);
    })
}

exports.getAutocomplete = (keyword) => {
  axios
    .get(`http://localhost:8000/autocomplete/${keyword}`)
    .then(res => {
      if (res.data.suggestions === undefined) {
        console.error("Malformed response");
      } else {
        for (const suggestion of res.data.suggestions) {
          console.log(suggestion);
        }
      }
    })
    .catch(error => {
      console.error(error);
    })
}

exports.getTrie = () => {
  axios
    .get(`http://localhost:8000/`)
    .then(res => {
      if (res.data.result === undefined) {
        console.error("Malformed response");
      } else {
        for (const keyword of res.data.result) {
          console.log(keyword);
        }
      }
    })
    .catch(error => {
      console.error(error);
    })
}

exports.deleteKeyword = (keyword) => {
  axios
    .delete(`http://localhost:8000/delete/${keyword}`)
    .then(res => {
      if (res.data.succeeded === undefined) {
        console.error("Malformed response");
      } else if (res.data.succeeded) {
        console.log("delete successful");
      } else {
        console.error("delete unsuccessful");
      }
    })
    .catch(error => {
      console.error(error);
    })
}