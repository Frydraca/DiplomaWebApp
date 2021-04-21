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
  },
});

export const { loadAllScripts, loadOneScript } = scriptSlice.actions;

export default scriptSlice.reducer;
