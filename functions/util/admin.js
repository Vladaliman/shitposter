const firebase = require("firebase");
const admin = require("firebase-admin");

admin.initializeApp({
  projectId: "shitposter-1c203",
});

const db = firebase.firestore();

module.exports = { admin, db };
