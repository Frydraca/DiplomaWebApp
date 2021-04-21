import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "oneMap",
  initialState: {},
  reducers: {
    loadMap(_state, action) {
      console.log("load");
      return action.payload.oneMap;
    },
  },
});

export const { loadMap } = mapSlice.actions;

export default mapSlice.reducer;
