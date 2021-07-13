import {combineReducers} from 'redux';
import {fetchThemesReducer} from './start/fetchThemesReducer';
import {fetchDialogsReducer} from './queue/fetchDialogsReducer';
import {getDeviceStateReducer} from './deviceState/getDeviceStateReducer';
import {enterChatReducer} from './start/enterChatReducer';

export const rootReducer = combineReducers({
  themes: fetchThemesReducer,
  dialogs: fetchDialogsReducer,
  deviceState: getDeviceStateReducer,
  enterChat: enterChatReducer
});
