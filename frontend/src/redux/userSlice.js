import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "customer",
  initialState: {
    user: null,
    token: null,
  },

  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { getUser, getToken } = userSlice.actions;

export default userSlice.reducer;
