import {call, put, takeLatest} from 'redux-saga/effects';
import {SEND_MESSAGE_REQUEST} from './types';
import firebase from '../../firebase/firebase';
import {sendMessageSuccess, sendMessageFailure} from './actions';

function* sendMessageSaga(action) {
  console.log('saga');
  try {
    const refMessages = firebase
      .database()
      .ref(
        'dialogs/' +
          action.payload.key +
          '/messages/' +
          action.payload.message.timestamp
      );
    console.log(refMessages);
    yield call(() => refMessages.set(action.payload.message));
    const refActivity = firebase
      .database()
      .ref('dialogs/' + action.payload.key);
    yield call(() =>
      refActivity.update({latestActivity: action.payload.message.timestamp})
    );
    yield put(sendMessageSuccess());
  } catch (error) {
    yield put(sendMessageFailure(error));
  }
}

function* sendMessageSagaWatcher() {
  yield takeLatest(SEND_MESSAGE_REQUEST, sendMessageSaga);
}

export default sendMessageSagaWatcher();
