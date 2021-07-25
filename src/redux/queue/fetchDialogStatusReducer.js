import {
  FETCH_DIALOG_STATUS_SUCCESS,
  FETCH_DIALOG_STATUS_FAILURE
} from './types';

const initialState = {
  status: '',
  fetchDialogStatusErrors: {}
};

export const fetchDialogStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DIALOG_STATUS_SUCCESS:
      return {...state, status: action.payload.status};
    case FETCH_DIALOG_STATUS_FAILURE:
      return {...state, fetchDialogStatusErrors: action.payload.error};
    default:
      return state;
  }
};
