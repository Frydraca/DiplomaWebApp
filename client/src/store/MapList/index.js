import { createSlice } from "@reduxjs/toolkit";

const mapListSlice = createSlice({
  name: "map List",
  initialState: {},
  reducers: {
    loadMapList(_state, action) {
      return action.payload.maps;
    },
  },
});

export const { loadMapList } = mapListSlice.actions;

export default mapListSlice.reducer;
