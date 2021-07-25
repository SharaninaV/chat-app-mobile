import {
  FETCH_DIALOGS_REQUEST,
  FETCH_DIALOGS_SUCCESS,
  FETCH_DIALOGS_FAILURE,
  FETCH_DIALOG_STATUS_REQUEST,
  FETCH_DIALOG_STATUS_SUCCESS,
  FETCH_DIALOG_STATUS_FAILURE
} from './types';

export const fetchDialogsRequest = () => ({type: FETCH_DIALOGS_REQUEST});
export const fetchDialogsSuccess = (dialogs) => ({
  type: FETCH_DIALOGS_SUCCESS,
  payload: {dialogs}
});
export const fetchDialogsFailure = (error) => ({
  type: FETCH_DIALOGS_FAILURE,
  payload: {error}
});

export const fetchDialogStatusRequest = (key) => ({
  type: FETCH_DIALOG_STATUS_REQUEST,
  payload: {key}
});
export const fetchDialogStatusSuccess = (status) => ({
  type: FETCH_DIALOG_STATUS_SUCCESS,
  payload: {status}
});
export const fetchDialogStatusFailure = (error) => ({
  type: FETCH_DIALOG_STATUS_FAILURE,
  payload: {error}
});
