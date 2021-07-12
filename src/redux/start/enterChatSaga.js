import {call, put, takeLatest} from 'redux-saga/effects';
import firebase from '../../firebase/firebase';
import {enterChatSuccess, enterChatFailure} from './actions';
import {ENTER_CHAT_REQUEST} from './types';

function* enterChatSaga(action) {
  try {
    const refDialogs = yield call(() => firebase.database().ref('dialogs'));
    const newDialog = yield call(() => {
      const date = Date.now();
      const dialog = {
        clientName: action.payload.name,
        latestActivity: date,
        operatorID: '',
        saved: false,
        status: 'queued',
        messaqes: [
          {
            content:
              'Тема: ' +
              action.payload.selectedThemeTitle +
              '. Подтема: ' +
              action.payload.selectedSubthemeTitle,
            timestamp: date,
            writtenBy: 'client'
          }
        ]
      };
      return dialog;
    });
    yield call(() => {
      refDialogs.push(newDialog);
    });
    yield put(enterChatSuccess());
  } catch (error) {
    yield put(enterChatFailure(error));
  }
}

function* enterChatSagaWatcher() {
  yield takeLatest(ENTER_CHAT_REQUEST, enterChatSaga);
}

export default enterChatSagaWatcher();
