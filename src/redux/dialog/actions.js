import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE
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
