import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  FETCH_CURRENT_DIALOG_REQUEST,
  FETCH_CURRENT_DIALOG_SUCCESS,
  FETCH_CURRENT_DIALOG_FAILURE
} from './types';

export const sendMessageRequest = (key, message) => ({
  type: SEND_MESSAGE_REQUEST,
  payload: {key, message}
});

export const sendMessageSuccess = () => ({type: SEND_MESSAGE_SUCCESS});

export const sendMessageFailure = (error) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: {error}
});

export const fetchCurrentDialogRequest = (key) => ({
  type: FETCH_CURRENT_DIALOG_REQUEST,
  payload: {key}
});

export const fetchCurrentDialogSuccess = (data) => ({
  type: FETCH_CURRENT_DIALOG_SUCCESS,
  payload: {data}
});

export const fetchCurrentDialogFailure = (error) => ({
  type: FETCH_CURRENT_DIALOG_FAILURE,
  payload: {error}
});
