import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    loadUser(_state, action) {
      return action.payload.user;
    },
  },
});

export const { loadUser } = userSlice.actions;

export default userSlice.reducer;
