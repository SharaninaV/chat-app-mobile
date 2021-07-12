import {FETCH_THEMES_SUCCESS, FETCH_THEMES_FAILURE} from './types';

const initialState = {
  themes: [],
  fetchThemesErrors: {}
};

export const fetchThemesSaga = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THEMES_SUCCESS:
      return {...state, themes: action.payload.themes};
    case FETCH_THEMES_FAILURE:
      return {...state, fetchThemesErrors: action.payload.error};
    default:
      return state;
  }
};
