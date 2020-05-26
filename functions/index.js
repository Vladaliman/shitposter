const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyCGFyu6n87y7qzdRjSE_ULx21Gda3V2Kfo",
  authDomain: "shitposter-1c203.firebaseapp.com",
  databaseURL: "https://shitposter-1c203.firebaseio.com",
  projectId: "shitposter-1c203",
  storageBucket: "shitposter-1c203.appspot.com",
  messagingSenderId: "361849568607",
  appId: "1:361849568607:web:84d2db0dd19c65cb04caea",
  measurementId: "G-X79Y3LNBMM",
};

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

app.get("/screams", (req, res) => {
  admin
    .firestore()
    .collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
});

app.post("/scream", (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };
  admin
    .firestore()
    .collection("screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} has been created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong on the server" });
      console.error(err);
    });
});

// Sign up

app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };
  // validate data
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
      return res
        .status(201)
        .json({ message: `user ${data.user.uid} signed up successfuly` });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    });
});

exports.api = functions.https.onRequest(app);
