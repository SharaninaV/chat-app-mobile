import {all} from 'redux-saga/effects';
import FetchThemesSaga from '../redux/start/fetchThemesSaga';
import EnterChatSaga from '../redux/start/enterChatSaga';

export default function* rootSaga() {
  yield all([FetchThemesSaga, EnterChatSaga]);
}
