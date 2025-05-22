import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategorizedProduct } from "../../../hooks/useGetCategorizedProducts";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import ProductCard from "../../ProductCard";
import { toast } from "react-hot-toast";
import CardSkeleton from "../../CardSkeleton";
const Category = ({ categoryName }) => {
  const navigate = useNavigate();
  const { categoryName: cName } = useParams();
  const [page, setPage] = useState(1);
  const [products, hasMore, loading] = useGetCategorizedProduct(
    categoryName ? categoryName : cName,
    page
  );
  // const handleScroll = async () => {
  //   try {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop + 1 >=
  //       document.documentElement.offsetHeight
  //     ) {
  //       setPage((prev) => prev + 1);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener("click", handleScroll);
  //   setPage(1);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [loading, page]);

  const { user } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    dispatch(addToCart(item));
    toast.success(`${item?.title} - is added to cart`, {
      style: {
        background: "#f0f0f0",
        color: "#000",
        fontSize: "16px",
        fontWeight: "500",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ccc",
        transition: "all 0.3s ease",
      },
      iconTheme: {
        primary: "#4caf50",
        secondary: "#fff",
      },
    });
  };
  return (
    <div className=" container mx-auto sm:px-20 py-8 min-h-screen">
      <h1 className="text-2xl  mb-4">
        CATEGORY:{" "}
        <span className="text-main font-bold">
          {categoryName
            ? categoryName?.toLocaleUpperCase()
            : cName?.toLocaleUpperCase()}
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
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <CardSkeleton key={index} />
            ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center items-center my-4">
          <button
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            className=" text-main px-4 py-1 rounded-full hover:bg-[#bd5a5a] hover:text-white transition duration-300"
          >
            Load more...
          </button>
        </div>
      )}
      {/* <button>See more!</button> */}
    </div>
  );
};

export default Category;
