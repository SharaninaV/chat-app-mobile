import {combineReducers} from 'redux';
import {fetchThemesSaga} from './start/fetchThemesReducer';

export const rootReducer = combineReducers({
  themes: fetchThemesSaga
});
