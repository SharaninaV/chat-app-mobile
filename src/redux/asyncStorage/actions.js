import {CHANGE_DEFAULT_SCREEN} from './types';

export const changeDefaultScreen = (screen) => ({
  type: CHANGE_DEFAULT_SCREEN,
  payload: {screen}
});
