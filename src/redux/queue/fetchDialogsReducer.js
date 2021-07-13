import {FETCH_DIALOGS_SUCCESS, FETCH_DIALOGS_FAILURE} from './types';

const initialState = {
  dialogs: [],
  fetchDialogsErrors: {}
};

export const fetchDialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DIALOGS_SUCCESS:
      return {...state, dialogs: action.payload.dialogs};
    case FETCH_DIALOGS_FAILURE:
      return {...state, fetchDialogsErrors: action.payload.error};
    default:
      return state;
  }
};
