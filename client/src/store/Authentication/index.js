import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    loadAuthData(_state, action) {
      localStorage.setItem("jwtToken", action.payload.auth.token);
      localStorage.setItem(
        "jwtTokenExpirationTime",
        action.payload.auth.tokenExpirationTime
      );
      return action.payload.auth;
    },
    removeAuthData() {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("jwtTokenExpirationTime");
      return {};
    },
  },
});

export const { removeAuthData, loadAuthData } = authSlice.actions;
export default authSlice.reducer;
