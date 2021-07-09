import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MESUREMENT_ID
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCxZgCzduz3yHGxpQz2KqEBJ5qAsBKirWQ',
  authDomain: 'noorsoft-internship.firebaseapp.com',
  databaseURL:
    'https://noorsoft-internship-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'noorsoft-internship',
  storageBucket: 'noorsoft-internship.appspot.com',
  messagingSenderId: '438460175395',
  appId: '1:438460175395:web:bfbb97a436070def340d96',
  measurementId: 'G-282Q8H3CEY'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
