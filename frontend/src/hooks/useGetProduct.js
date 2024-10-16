import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getSelectedProduct } from "../redux/productSlice";
import { BACKEND_URL } from "../utils/constants";
const useGetProduct = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/store/get-product?id=${id}`
        );
        dispatch(getSelectedProduct(response?.data?.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);
};

export default useGetProduct;
