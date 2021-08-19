import {
  UPLOAD_PHOTO_REQUEST,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAILURE, SAVE_FILEPATH, RESET_FILEPATH,
} from "./types";

export const uploadPhotoRequest = (key, message, filePath) => ({
  type: UPLOAD_PHOTO_REQUEST,
  payload: {key, message, filePath}
});
export const uploadPhotoSuccess = () => ({type: UPLOAD_PHOTO_SUCCESS});
export const uploadPhotoFailure = (error) => ({
  type: UPLOAD_PHOTO_FAILURE,
  payload: {error}
});

export const saveFilePath = (filePath) => ({type: SAVE_FILEPATH, payload: {filePath}})
export const resetFilePath = () => ({type: RESET_FILEPATH})
