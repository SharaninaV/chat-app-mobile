import {
  GET_DEVICE_STATE_REQUEST,
  GET_DEVICE_STATE_SUCCESS,
  GET_DEVICE_STATE_FAILURE
} from './types';

export const getDeviceStateRequest = () => ({type: GET_DEVICE_STATE_REQUEST});

export const getDeviceStateSuccess = (data) => ({
  type: GET_DEVICE_STATE_SUCCESS,
  payload: {data}
});

export const getDeviceStateFailure = (error) => ({
  type: GET_DEVICE_STATE_FAILURE,
  payload: {error}
});
