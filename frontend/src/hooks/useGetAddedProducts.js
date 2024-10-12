import React, { useEffect } from "react";
import axios from "axios";
const useGetAddedProducts = (ids) => {
  useEffect(() => {
    const fetchAddedProducts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`/api/v1/cart/get-added-products`, {
          ids,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddedProducts();
  }, []);
};
export default useGetAddedProducts;
