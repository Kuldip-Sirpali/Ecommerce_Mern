import React, { useEffect } from "react";
import useGetProduct from "../../../hooks/useGetProduct";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageZoom from "./ImageZoom";
import Button from "../../Button";
import ProductDetails from "./ProductDetails";
import { addToCart } from "../../../redux/cartSlice";
import { FaCartArrowDown } from "react-icons/fa";
import toast from "react-hot-toast";
const ProductView = () => {
  const { id } = useParams();
  useGetProduct(id);
  const { selectedProduct } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
    toast.success(`${selectedProduct?.title} - is added to cart`, {
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

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, []);

  return (
    <div className=" min-h-screen w-full flex flex-col md:flex-row sm:px-24 px-4 py-2">
      <section className="w-full md:w-8/12 lg:w-4/12 h-full bg-white p-4">
        <div className="h-auto w-full md:w-64 md:h-80 zoom-image-main-container p-4 flex flex-col gap-2">
          <ImageZoom src={selectedProduct?.image} />
          <Button
            onClick={handleAddToCart}
            className="w-full px-4 py-2 bg-main hover:bg-Hmain transition-colors text-white font-medium rounded-md mt-4"
          >
            Add to Cart <FaCartArrowDown className="inline-block ml-2" />
          </Button>
        </div>
      </section>
      <section className="w-full md:w-4/12 lg:w-8/12 h-full p-8">
        <ProductDetails />
      </section>
    </div>
  );
};

export default ProductView;
