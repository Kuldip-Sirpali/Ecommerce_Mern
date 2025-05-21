import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "customer",
  initialState: {
    user: null,
  },

  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    updateAccessToken: (state, action) => {
      state.user.accessToken = action.payload;
    },
    updateRefreshToken: (state, action) => {
      state.user.refreshToken = action.payload;
    },
  },
});

export const { getUser, updateAccessToken, updateRefreshToken } =
  userSlice.actions;

export default userSlice.reducer;
