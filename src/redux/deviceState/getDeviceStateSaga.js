import {getDeviceStateFailure, getDeviceStateSuccess} from './actions';
import {put, takeLatest, call} from 'redux-saga/effects';
import OneSignal from 'react-native-onesignal';
import {GET_DEVICE_STATE_REQUEST} from './types';

function* getDeviceStateSaga(action) {
  try {
    const deviceState = yield call(() => OneSignal.getDeviceState());

    yield put(getDeviceStateSuccess(deviceState));
  } catch (error) {
    yield put(getDeviceStateFailure(error));
  }
}

function* getDeviceStateSagaWatcher() {
  yield takeLatest(GET_DEVICE_STATE_REQUEST, getDeviceStateSaga);
}

export default getDeviceStateSagaWatcher();
