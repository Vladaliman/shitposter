const firebase = require("firebase");
const admin = require("firebase-admin");

const db = firebase.firestore();

module.exports = { admin, db };
