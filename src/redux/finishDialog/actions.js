import {
  FINISH_DIALOG_REQUEST,
  FINISH_DIALOG_SUCCESS,
  FINISH_DIALOG_FAILURE
} from './types';

export const finishDialogRequest = (key, rating) => ({
  type: FINISH_DIALOG_REQUEST,
  payload: {key, rating}
});

export const finishDialogSuccess = () => ({type: FINISH_DIALOG_SUCCESS});

export const finishDialogFailure = (error) => ({
  type: FINISH_DIALOG_FAILURE,
  payload: {error}
});
