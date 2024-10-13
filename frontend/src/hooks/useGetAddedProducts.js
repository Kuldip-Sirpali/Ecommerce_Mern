import React, { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
const useGetAddedProducts = (ids) => {
  useEffect(() => {
    const fetchAddedProducts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${BACKEND_URL}/api/v1/cart/get-added-products`, {
          ids,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddedProducts();
  }, []);
};
export default useGetAddedProducts;
