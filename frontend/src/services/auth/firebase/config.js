import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCf9oWPj2yak0so2FuS7xICc2o9q8hCBp4',
  authDomain: 'taraz-6cde2.firebaseapp.com',
  projectId: 'taraz-6cde2',
  storageBucket: 'taraz-6cde2.appspot.com',
  messagingSenderId: '431466577237',
  appId: '1:431466577237:web:afa023e477cf37ff1203dc',
  measurementId: 'G-MRF4TMDJ65',
};

firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const database = firebase.database();
export { auth, database, googleAuthProvider };
