import { createSlice } from "@reduxjs/toolkit";

const ownScriptSlice = createSlice({
  name: "ownScripts",
  initialState: {},
  reducers: {
    loadOwnScripts(_state, action) {
      return action.payload.scripts;
    },
  },
});

export const { loadOwnScripts } = ownScriptSlice.actions;

export default ownScriptSlice.reducer;
