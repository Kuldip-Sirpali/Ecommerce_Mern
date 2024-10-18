import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "appAdmin",
  initialState: {
    admin: null,
    users: null,
    products: null,
    refresh: true,
    token: null,
  },

  reducers: {
    getAdmin: (state, action) => {
      state.admin = action.payload;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { getAdmin, getUsers, getProducts, getRefresh, getToken } =
  adminSlice.actions;

export default adminSlice.reducer;
