import {call, put, takeLatest} from 'redux-saga/effects';
import firebase from '../../firebase/firebase';
import RNFS from 'react-native-fs';
import {uploadPhotoFailure, uploadPhotoSuccess} from './actions';
import {UPLOAD_PHOTO_REQUEST} from './types';

function* uploadPhotoSaga(action) {
  try {
    const refMessages = firebase
      .database()
      .ref(
        'dialogs/' +
          action.payload.key +
          '/messages/' +
          action.payload.message.timestamp
      );
    yield call(() => {
      RNFS.readFile(action.payload.filePath, 'base64').then((data) => {
        const newMessage = {
          content: 'data:image/jpg;base64,' + data,
          timestamp: action.payload.message.timestamp,
          writtenBy: action.payload.message.writtenBy
        };
        refMessages.set(newMessage);
      });
    });
    const refActivity = firebase
      .database()
      .ref('dialogs/' + action.payload.key);
    yield call(() =>
      refActivity.update({latestActivity: action.payload.message.timestamp})
    );
    yield put(uploadPhotoSuccess());
  } catch (error) {
    yield put(uploadPhotoFailure(error));
  }
}

function* uploadPhotoSagaWatcher() {
  yield takeLatest(UPLOAD_PHOTO_REQUEST, uploadPhotoSaga);
}

export default uploadPhotoSagaWatcher();
