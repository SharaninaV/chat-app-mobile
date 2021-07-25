import {all} from 'redux-saga/effects';
import FetchThemesSaga from '../redux/start/fetchThemesSaga';
import EnterChatSaga from '../redux/start/enterChatSaga';
import FetchDialogsSaga from '../redux/queue/fetchDialogsSaga';
import GetDeviceStateSaga from '../redux/deviceState/getDeviceStateSaga';
import SendMessageSaga from '../redux/dialog/sendMessageSaga';
import UploadToStorageSaga from './camera/uploadPhotoSaga';
import FinishDialogSaga from '../redux/finishDialog/finishDialogSaga';
import FetchCurrentDialogSaga from '../redux/dialog/fetchCurrentDialogSaga';
import FetchDialogStatusSaga from '../redux/queue/fetchDialogStatusSaga';

export default function* rootSaga() {
  yield all([
    FetchThemesSaga,
    EnterChatSaga,
    FetchDialogsSaga,
    GetDeviceStateSaga,
    SendMessageSaga,
    UploadToStorageSaga,
    FinishDialogSaga,
    FetchCurrentDialogSaga,
    FetchDialogStatusSaga
  ]);
}
