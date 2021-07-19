import {
  UPLOAD_TO_STORAGE_REQUEST,
  UPLOAD_TO_STORAGE_SUCCESS,
  UPLOAD_TO_STORAGE_FAILURE
} from './types';

export const uploadToStorageRequest = (uri) => ({
  type: UPLOAD_TO_STORAGE_REQUEST,
  payload: {uri}
});
export const uploadToStorageSuccess = () => ({type: UPLOAD_TO_STORAGE_SUCCESS});
export const uploadToStorageFailure = (error) => ({
  type: UPLOAD_TO_STORAGE_FAILURE,
  payload: {error}
});
