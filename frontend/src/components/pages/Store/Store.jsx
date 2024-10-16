import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import useGetProducts from "../../../hooks/useGetProducts";
const Store = () => {
  const { user } = useSelector((state) => state.customer);
  const navigate = useNavigate();
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
      navigate("/auth");
      return;
    }
    dispatch(addToCart(item));
  };

  return (
    <div className=" container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl  mb-4">EXPLORE PRODUCTS</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-2">
            <div
              onClick={() => {
                navigate(`/product/${item?._id}`);
              }}
              className="h-64 w-full overflow-hidden bg-white border-2 border-[#80ed99 ] flex items-center justify-center "
            >
              <img loading="lazy" src={item?.image} alt={item?.title} />
            </div>
            <h2 className="text-lg ">
              {item.title.length > 20
                ? `${item.title.slice(0, 20)}...`
                : item.title}
            </h2>
            <h3 className='text-green-400 text-sm'>Rs.{item.price}</h3>

            <Button
              onClick={() => handleAddToCart(item)}
              className="bg-[#38a3a5]"
            >
              Add to cart
            </Button>
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center my-4">
          <svg
            className="animate-spin h-5 w-5 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="4"
              stroke="currentColor"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Store;
