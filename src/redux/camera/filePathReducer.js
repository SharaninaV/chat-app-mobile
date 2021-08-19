import { RESET_FILEPATH, SAVE_FILEPATH } from "./types";

const initialState = {
  filePath: "",
};

export const filePathReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FILEPATH:
      return { ...state, filePath: action.payload.filePath };
    case RESET_FILEPATH:
      return { ...state, filePath: "" };
    default:
      return state;
  }
};
