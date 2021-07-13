import {call, put, takeLatest} from 'redux-saga/effects';
import firebase from '../../firebase/firebase';
import {fetchDialogsFailure, fetchDialogsSuccess} from './actions';
import {FETCH_DIALOGS_REQUEST} from './types';

function* fetchDialogsSaga(action) {
  try {
    const ref = yield call(() => firebase.database().ref('dialogs'));
    const fetchedSnapshot = yield call(() =>
      ref.orderByChild('latestActivity').once('value', (snapshot) => snapshot)
    );
    const fetchedDialogs = yield call(() => {
      const result = [];
      fetchedSnapshot.forEach((childSnapshot) => {
        result.unshift({key: childSnapshot.key, data: childSnapshot.val()});
      });
      return result;
    });
    yield put(fetchDialogsSuccess(fetchedDialogs));
  } catch (error) {
    yield put(fetchDialogsFailure(error));
  }
}

function* fetchDialogsSagaWatcher() {
  yield takeLatest(FETCH_DIALOGS_REQUEST, fetchDialogsSaga);
}

export default fetchDialogsSagaWatcher();
