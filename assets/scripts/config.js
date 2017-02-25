import firebase from 'firebase/app';
require("firebase/auth");
require("firebase/database");

export const FIREBASE_URL = 'https://contriboot-2017.firebaseio.com';

var config = {
   apiKey: "AIzaSyB12-gGTDUH8a9DjR4Y8br5B_3e3swnMC4",
   authDomain: "contriboot-2017.firebaseapp.com",
   databaseURL: "https://contriboot-2017.firebaseio.com",
 };
firebase.initializeApp(config);


export default firebase;
