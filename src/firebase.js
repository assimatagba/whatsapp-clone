import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC9iFyk9JBioNKMXna6PwU9_nG6SJqYE4w",
    authDomain: "whats-app-clone-98ab0.firebaseapp.com",
    projectId: "whats-app-clone-98ab0",
    storageBucket: "whats-app-clone-98ab0.appspot.com",
    messagingSenderId: "189116977869",
    appId: "1:189116977869:web:2e4323ef72e3b37f550f84",
    measurementId: "G-YSH1Z66ZVL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider};
export default db;