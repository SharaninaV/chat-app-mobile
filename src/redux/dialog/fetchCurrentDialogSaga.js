import {call, put, takeLatest} from 'redux-saga/effects';
import firebase from '../../firebase/firebase';
import {FETCH_CURRENT_DIALOG_REQUEST} from './types';
import {sendMessageFailure, fetchCurrentDialogSuccess} from './actions';

function* fetchCurrentDialogSaga(action) {
  try {
    const refMessages = firebase
      .database()
      .ref('dialogs/' + action.payload.key);
    const fetchedDialog = yield call(() => (refMessages.once('value').then(snapshot => snapshot.val())))
    yield put(fetchCurrentDialogSuccess(fetchedDialog));
  } catch (error) {
    yield put(sendMessageFailure(error));
  }
}

function* fetchCurrentDialogSagaWatcher() {
  yield takeLatest(FETCH_CURRENT_DIALOG_REQUEST, fetchCurrentDialogSaga);
}

export default fetchCurrentDialogSagaWatcher();
