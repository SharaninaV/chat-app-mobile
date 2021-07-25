import {
  FETCH_CURRENT_DIALOG_SUCCESS,
  FETCH_CURRENT_DIALOG_FAILURE
} from './types';

const initialState = {
  currentDialog: [],
  fetchCurrentDialogErrors: {}
};

export const fetchCurrentDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_DIALOG_SUCCESS:
      return {...state, currentDialog: action.payload.data};
    case FETCH_CURRENT_DIALOG_FAILURE:
      return {...state, fetchCurrentDialogErrors: action.payload.error};
    default:
      return state;
  }
};
