import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "current game",
  initialState: {},
  reducers: {
    loadMapList(_state, action) {
      return action.payload.maps;
    },
  },
});

export const { loadMapList } = mapSlice.actions;

export default mapSlice.reducer;
