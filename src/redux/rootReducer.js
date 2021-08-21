import {combineReducers} from 'redux';
import {fetchThemesReducer} from './start/fetchThemesReducer';
import {fetchDialogsReducer} from './queue/fetchDialogsReducer';
import {getDeviceStateReducer} from './deviceState/getDeviceStateReducer';
import {enterChatReducer} from './start/enterChatReducer';
import {asyncStorageReducer} from './asyncStorage/asyncStorageReducer';
import {fetchCurrentDialogReducer} from './dialog/fetcchCurrentDialogReducer';
import {fetchDialogStatusReducer} from './queue/fetchDialogStatusReducer';
import {filePathReducer} from './camera/filePathReducer';

export const rootReducer = combineReducers({
  themes: fetchThemesReducer,
  dialogs: fetchDialogsReducer,
  deviceState: getDeviceStateReducer,
  enterChat: enterChatReducer,
  asyncStorage: asyncStorageReducer,
  currentDialog: fetchCurrentDialogReducer,
  dialogStatus: fetchDialogStatusReducer,
  filePath: filePathReducer
});
