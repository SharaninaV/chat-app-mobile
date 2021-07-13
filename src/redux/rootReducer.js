import {combineReducers} from 'redux';
import {fetchThemesReducer} from './start/fetchThemesReducer';
import {fetchDialogsReducer} from './queue/fetchDialogsReducer';

export const rootReducer = combineReducers({
  themes: fetchThemesReducer,
  dialogs: fetchDialogsReducer
});
