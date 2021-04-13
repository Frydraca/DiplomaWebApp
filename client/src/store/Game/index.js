import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "current game",
  initialState: {},
  reducers: {
    loadGame(_state, action) {
      return action.payload.game;
    },
  },
});

export const { loadGame } = gameSlice.actions;

export default gameSlice.reducer;
