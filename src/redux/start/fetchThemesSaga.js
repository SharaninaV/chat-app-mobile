import {call, put, takeLatest} from 'redux-saga/effects';
import firebase from '../../firebase/firebase';
import {fetchThemesSuccess, fetchThemesFailure} from './actions';
import {FETCH_THEMES_REQUEST} from './types';

function* fetchThemesSaga(action) {
  try {
    const ref = yield call(() => firebase.database().ref('themes'));
    const fetchedSnapshot = yield call(() =>
      ref.once('value').then((snapshot) => snapshot)
    );
    const fetchedThemes = yield call(() => {
      const result = [];
      fetchedSnapshot.forEach((childSnapshot) => {
        result.push({key: childSnapshot.key, data: childSnapshot.val()});
      });
      return result;
    });
    yield put(fetchThemesSuccess(fetchedThemes));
  } catch (error) {
    yield put(fetchThemesFailure(error));
  }
}

function* fetchThemesSagaWatcher() {
  yield takeLatest(FETCH_THEMES_REQUEST, fetchThemesSaga);
}

export default fetchThemesSagaWatcher();
