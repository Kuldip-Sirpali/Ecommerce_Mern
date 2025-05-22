import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToCart } from "../../../redux/cartSlice";
import ProductCard from "../../ProductCard";
import { toast } from "react-hot-toast";
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query"); // Get the 'query' parameter from the URL
  const navigate = useNavigate();
  const { searchProducts } = useSelector((state) => state.items);
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
    <section className="px-4 sm:px-12 md:px-24 py-8 min-h-screen ]">
      <div className="mb-10 flex flex-col items-center">
        <p className="text-main text-2xl sm:text-3xl font-semibold tracking-wide">
          Search results for:
        </p>
        <span className="mt-2 text-4xl font-extrabold text-main break-all text-center drop-shadow-sm">
          {query}
        </span>
        <div className="mt-2 h-1 w-24 bg-Hmain rounded-full opacity-60" />
      </div>

      {searchProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {searchProducts.map((item) => (
            <ProductCard key={item?._id} item={item} method={handleAddToCart} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-8 py-32">
          <p className="text-4xl text-main font-extrabold tracking-tight drop-shadow">
            No results found
          </p>
          <p className="text-lg text-gray-600 text-center max-w-lg">
            We couldn't find any products matching your search.
            <br />
            Try adjusting your keywords or browse our categories.
          </p>
        </div>
      )}
    </section>
  );
};

export default SearchPage;
