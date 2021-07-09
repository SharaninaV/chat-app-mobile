import {
  FETCH_THEMES_REQUEST,
  FETCH_THEMES_SUCCESS,
  FETCH_THEMES_FAILURE
} from './types';

export const fetchThemesRequest = () => ({type: FETCH_THEMES_REQUEST});
export const fetchThemesSuccess = (themes) => ({
  type: FETCH_THEMES_SUCCESS,
  payload: {themes}
});
export const fetchThemesFailure = (error) => ({
  type: FETCH_THEMES_FAILURE,
  payload: {error}
});
