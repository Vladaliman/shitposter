const firebase = require("firebase");
const admin = require("firebase-admin");

admin.initializeApp();

const db = firebase.firestore();

module.exports = { admin, db };
