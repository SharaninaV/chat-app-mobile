import {ENTER_CHAT_SUCCESS} from './types';

const initialState = {
  currentDialogKey: ''
};

export const enterChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENTER_CHAT_SUCCESS:
      console.log(action.payload.currentDialogKey);
      return {...state, currentDialogKey: action.payload.currentDialogKey};
    default:
      return state;
  }
};
