import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "items",
  initialState: {
    searchProducts: null,
    products: null,
    selectedProduct: null,
    // page: 1,
    refresh: false,
  },
  reducers: {
    getSearchProducts: (state, action) => {
      state.searchProducts = action.payload;
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    // getPage: (state) => {
    //   state.page += 1;
    // },
  },
});

export const {
  getSearchProducts,
  getProducts,
  getSelectedProduct,
  getRefresh,
} = productSlice.actions;

export default productSlice.reducer;
