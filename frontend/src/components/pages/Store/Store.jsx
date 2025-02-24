import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import useGetProducts from "../../../hooks/useGetProducts";
import ProductCard from "../../ProductCard";
import { BiLoader } from "react-icons/bi";
import CardSkeleton from "../../CardSkeleton";
import { BACKEND_URL } from "../../../utils/constants";
import axios from "axios";
const Store = () => {
  const { user } = useSelector((state) => state.customer);
  const navigate = useNavigate();
  useEffect(() => {
    const refreshToken = async () => {
      try {
        axios.defaults.withCredentials = true;
        await axios.post(
          `${BACKEND_URL}/api/v1/user/refresh-token`
        );
      } catch (error) {
        navigate("/sign-in");
      }
    };
    // Refresh token every 1hr
    const intervalId = setInterval(
      refreshToken,
      import.meta.env.VITE_ACCESS_TOKEN_EXPIRY
    );

    // Initial refresh
    refreshToken();

    return () => clearInterval(intervalId);
  }, []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [products] = useGetProducts(page, loading, setLoading);
  const handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.offsetHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    dispatch(addToCart(item));
  };

  return (
    <div className=" container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl  mb-4">EXPLORE PRODUCTS</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products?.map((item) => (
          <ProductCard key={item?._id} item={item} method={handleAddToCart} />
        ))}
      </div>
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <CardSkeleton key={index} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Store;
