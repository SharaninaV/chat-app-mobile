import {GET_DEVICE_STATE_SUCCESS, GET_DEVICE_STATE_FAILURE} from './types';

const initialState = {
  deviceState: {},
  deviceStateErrors: {}
};

export const getDeviceStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DEVICE_STATE_SUCCESS:
      return {...state, deviceState: action.payload.data};
    case GET_DEVICE_STATE_FAILURE:
      return {...state, deviceStateErrors: action.payload.error};
    default:
      return state;
  }
};
