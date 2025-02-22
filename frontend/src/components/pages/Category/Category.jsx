
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCategorizedProduct } from '../../../hooks/useGetCategorizedProducts';
import Button from '../../Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import { FaCartArrowDown } from "react-icons/fa";
const Category = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams()
  const [page, setPage] = useState(1);
  const [products, loading] = useGetCategorizedProduct(categoryName, page);
  const handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.offsetHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setPage(1);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page]);

  const { user } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    dispatch(addToCart(item))

  }
  return (
    <div className=" container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl  mb-4">CATEGORY: <span className='text-[#70e000] font-bold'>

        {categoryName.toLocaleUpperCase()}
      </span>




      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((item) => (

          
          <div className="bg-white shadow-lg rounded-lg p-4   transform border border-[#80d459] transition-all duration-300">
            <div
              style={{
                backgroundImage: `url(${item?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="h-56 w-full overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer rounded-t-md group relative"
              onClick={() => navigate(`/product/${item?._id}`)}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">

              </div>
            </div>

            <div className="p-3 text-left">
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
  )
}

export default Category;