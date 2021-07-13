import {all} from 'redux-saga/effects';
import FetchThemesSaga from '../redux/start/fetchThemesSaga';
import EnterChatSaga from '../redux/start/enterChatSaga';
import FetchDialogsSaga from '../redux/queue/fetchDialogsSaga';

export default function* rootSaga() {
  yield all([FetchThemesSaga, EnterChatSaga, FetchDialogsSaga]);
}
