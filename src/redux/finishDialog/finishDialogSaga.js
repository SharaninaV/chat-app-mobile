import {call, put, takeLatest} from 'redux-saga/effects';
import {FINISH_DIALOG_REQUEST} from './types';
import firebase from '../../firebase/firebase';
import {finishDialogFailure, finishDialogSuccess} from './actions';

function* finishDialogSaga(action) {
  try {
    const ref = firebase.database().ref('dialogs/' + action.payload.key);
    yield call(() =>
      ref.update({status: 'finished', rating: action.payload.rating})
    );
    yield put(finishDialogSuccess());
  } catch (error) {
    yield put(finishDialogFailure(error));
  }
}

function* finishDialogSagaWatcher() {
  yield takeLatest(FINISH_DIALOG_REQUEST, finishDialogSaga);
}

export default finishDialogSagaWatcher();
