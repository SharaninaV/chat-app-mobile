import {all} from 'redux-saga/effects';
import FetchThemesSaga from '../redux/start/fetchThemesSaga';

export default function* rootSaga() {
  yield all([FetchThemesSaga]);
}
