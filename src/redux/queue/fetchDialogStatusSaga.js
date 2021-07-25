import {call, put, takeLatest} from 'redux-saga/effects';
import firebase from '../../firebase/firebase';
import {
  fetchDialogStatusFailure,
  fetchDialogStatusSuccess
} from './actions';
import {FETCH_DIALOG_STATUS_REQUEST} from './types';

function* fetchDialogStatusSaga(action) {
  try {
    const ref = yield call(() =>
      firebase.database().ref('dialogs/' + action.payload.key)
    );
    const fetchedStatus = yield call(() =>
      ref
        .orderByChild('status')
        .once('value')
        .then((snapshot) => snapshot.val().status)
    );
    yield put(fetchDialogStatusSuccess(fetchedStatus));
  } catch (error) {
    yield put(fetchDialogStatusFailure(error));
  }
}

function* fetchDialogStatusSagaWatcher() {
  yield takeLatest(FETCH_DIALOG_STATUS_REQUEST, fetchDialogStatusSaga);
}

export default fetchDialogStatusSagaWatcher();
