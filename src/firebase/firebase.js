import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';
import 'firebase/storage';

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
