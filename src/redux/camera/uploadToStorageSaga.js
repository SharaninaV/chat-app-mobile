import {call, put, takeLatest} from 'redux-saga/effects';
import {uploadToStorageFailure, uploadToStorageSuccess} from './actions';
import {UPLOAD_TO_STORAGE_REQUEST} from './types';
import firebase from '../../firebase/firebase';
import RNFS from 'react-native-fs';
import Buffer from 'buffer';

function* uploadToStorageSaga(action) {
  console.log('saga');
  try {
    const storageRef = firebase.storage().ref().child('images');
    const filePathSplit = action.payload.uri.split('/');
    const fileName = filePathSplit[filePathSplit.length - 1];
    const imageRef = storageRef.child(fileName);
    yield call(() => {
      RNFS.readFile(action.payload.uri, 'base64').then((data) => {
        imageRef.putString(data, 'base64').then((snapshot) => {
          console.log('Uploaded!');
        });
      });
    });
    yield put(uploadToStorageSuccess());
  } catch (error) {
    console.log(error);
    yield put(uploadToStorageFailure(error));
  }
}

function* uploadToStorageSagaWatcher() {
  yield takeLatest(UPLOAD_TO_STORAGE_REQUEST, uploadToStorageSaga);
}

export default uploadToStorageSagaWatcher();

// if (typeof global.atob === 'undefined') {
//   global.atob = (a) => Buffer.from(a, 'base64').toString('binary');
// }
