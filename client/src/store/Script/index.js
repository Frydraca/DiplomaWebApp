import { createSlice } from "@reduxjs/toolkit";

const scriptSlice = createSlice({
  name: "scripts",
  initialState: {},
  reducers: {
    loadAllScripts(_state, action) {
      return action.payload.scripts;
    },
    loadOneScript(_state, action) {
      return action.payload.script;
    },
    changeEditedScript(_state, action) {
      _state.code = action.payload.code;
      _state.workspace = action.payload.workspace;
      return _state;
    },
  },
});

export const {
  loadAllScripts,
  loadOneScript,
  changeEditedScript,
} = scriptSlice.actions;

export default scriptSlice.reducer;
