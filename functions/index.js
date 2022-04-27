const functions = require("firebase-functions");
const express = require("express");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

const api = express();

api.put("/add/:keyword", async (req, res) => {
  const db = getFirestore();
  const keyword = req.params.keyword;
  try {
    await db.runTransaction( async () => {
      let currentDocRef = db.collection("container").doc("head");
      for (const char of [...keyword]) {
        currentDocRef = currentDocRef.collection("children").doc(char);
      }
    })

  } catch (e) {
    res.status(500).json("{'Error': 'Request Failure'}");
  }

});

exports.api = functions.https.onRequest(api);
