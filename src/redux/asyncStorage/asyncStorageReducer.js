import {CHANGE_DEFAULT_SCREEN} from './types';

const initialState = {
  screen: 'start'
};

export const asyncStorageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DEFAULT_SCREEN:
      return {...state, screen: action.payload.screen};
    default:
      return state;
  }
};
