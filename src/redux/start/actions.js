import {
  FETCH_THEMES_REQUEST,
  FETCH_THEMES_SUCCESS,
  FETCH_THEMES_FAILURE,
  ENTER_CHAT_REQUEST,
  ENTER_CHAT_SUCCESS,
  ENTER_CHAT_FAILURE
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

export const enterChatRequest = (
  name,
  selectedThemeTitle,
  selectedSubthemeTitle
) => ({
  type: ENTER_CHAT_REQUEST,
  payload: {name, selectedThemeTitle, selectedSubthemeTitle}
});

export const enterChatSuccess = () => ({
  type: ENTER_CHAT_SUCCESS
});

export const enterChatFailure = (error) => ({
  type: ENTER_CHAT_FAILURE,
  payload: {error}
});