import {combineReducers} from 'redux';
import {fetchThemesReducer} from './start/fetchThemesReducer';

export const rootReducer = combineReducers({
  themes: fetchThemesReducer
});
