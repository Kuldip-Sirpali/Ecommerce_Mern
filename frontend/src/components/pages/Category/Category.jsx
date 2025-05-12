import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategorizedProduct } from "../../../hooks/useGetCategorizedProducts";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import ProductCard from "../../ProductCard";
import { BiLoader } from "react-icons/bi";
import CardSkeleton from "../../CardSkeleton";
const Category = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
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
      navigate("/sign-in");
      return;
    }
    dispatch(addToCart(item));
  };
  return (
    <div className=" container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl  mb-4">
        CATEGORY:{" "}
        <span className="text-[#70e000] font-bold">
          {categoryName.toLocaleUpperCase()}
        </span>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((item) => (
          <ProductCard key={item?._id} item={item} method={handleAddToCart} />
        ))}
      </div>
      {loading && (
        // <div className="flex justify-center items-center my-4">
        //   <BiLoader />
        // </div>
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

export default Category;
