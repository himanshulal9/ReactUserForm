import firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp8sgkqVNQHDWSp3en5Jmm-DX-6ygHfTc",
  authDomain: "reactcrudapp007.firebaseapp.com",
  projectId: "reactcrudapp007",
  storageBucket: "reactcrudapp007.appspot.com",
  messagingSenderId: "1037735974106",
  appId: "1:1037735974106:web:3585e5c05831e631b481e3",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default firebaseApp;
export { db };
