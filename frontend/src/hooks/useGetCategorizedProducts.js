import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/constants";
export const useGetCategorizedProduct = (categoryName, page) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Track if more data exists
  const fetchCategorizedProducts = async () => {
    if (!hasMore) {
      setLoading(false);
      return;
    } // Stop fetching if no more data
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/store/get-categorized-products?category=${categoryName}&page=${page}&limit=10`
      );
      if (response.data.data.length === 0) {
        setHasMore(false);
      }
      setProducts((prev) => {
        const newItems = [...prev, ...response?.data?.data];
        // Filter out duplicates based on a unique property (like _id)
        const uniqueItems = Array.from(
          new Set(newItems.map((item) => item._id))
        )
          .map((id) => {
            return newItems.find((item) => item._id === id);
          })
          .filter((item) => item.category === categoryName);

        return uniqueItems;
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCategorizedProducts();
  }, [page, categoryName]);

  return [products, loading, setLoading];
};
