import { useEffect } from "react";
import axios from "axios";
import api from "../api/apiConfig";
const useGetAddedProducts = (ids) => {
  useEffect(() => {
    const fetchAddedProducts = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await api.get(`/cart/get-added-products`, {
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
