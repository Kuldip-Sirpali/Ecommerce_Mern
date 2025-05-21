import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getSelectedProduct } from "../redux/productSlice";
import api from "../api/apiConfig";
const useGetProduct = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await api.get(
          `/store/get-product?id=${id}`
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
