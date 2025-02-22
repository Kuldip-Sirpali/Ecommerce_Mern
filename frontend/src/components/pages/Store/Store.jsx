import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import useGetProducts from "../../../hooks/useGetProducts";
import { FaCartArrowDown } from "react-icons/fa";
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
      navigate("/sign-in");
      return;
    }
    dispatch(addToCart(item));
  };

  return (
    <div className=" container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl  mb-4">EXPLORE PRODUCTS</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((item) => (

          <div key={item?._id} className="bg-white shadow-lg rounded-lg p-2  transform border border-[#80d459] transition-all  duration-1000 ">
            <div
              style={{
                backgroundImage: `url(${item?.image})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="h-36 w-full overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer rounded-t-md group relative"
              onClick={() => navigate(`/product/${item?._id}`)}
            >

            </div>

            <div className="p-1 text-left">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
              </h2>
              <h3 className="text-[#38b000] text-md font-medium mt-1">
                Rs. {item.price}
              </h3>
            </div>

            <Button
              onClick={() => handleAddToCart(item)}
              className="w-full px-4 py-2 bg-[#70e000] hover:bg-[#38b000] transition-colors text-white font-medium rounded-md mt-4"
            >
              Add to Cart <FaCartArrowDown className="inline-block ml-2" />
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
