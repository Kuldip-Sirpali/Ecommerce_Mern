import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/productSlice";
import { BACKEND_URL } from "../utils/constants";
const useGetProducts = (page, loading, setLoading) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/store/get-products?page=${page}&limit=10`
        );
        setProducts((prev) => {
          const newItems = [...prev, ...response?.data?.data];
          // Filter out duplicates based on a unique property (like _id)
          const uniqueItems = Array.from(
            new Set(newItems.map((item) => item._id))
          ).map((id) => {
            return newItems.find((item) => item._id === id);
          });

          return uniqueItems;
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [page, loading]);
  dispatch(getProducts(products));
  return [products];
};

export default useGetProducts;
