import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "errors",
  initialState: {},
  reducers: {
    addError(state, action) {
      state[action.payload.name] = action.payload.description;
      return state;
    },
    clearError(state, action) {
      delete state[action.payload.name];
      return state;
    },
  },
});

export const { addError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
