import React from "react";
import { useSelector } from "react-redux";
import { DISCOUNT_PERCENTAGE } from "../../../utils/constants";
const ProductDetails = () => {
  const { selectedProduct } = useSelector((state) => state.items);

  const finalPrice = Math.round(((100 - DISCOUNT_PERCENTAGE) / 100) * selectedProduct?.price);
  const discountedPrice = selectedProduct?.price - finalPrice;
  console.log(discountedPrice);
  return (
    <div>
      <section className="p-2">
        <h1 className="font-bold text-xl md:text-3xl">
          {selectedProduct?.title || "Nothing"}
        </h1>
      </section>
      <section className="p-2">
        <p className=" text-ls md:text-xl">
          {selectedProduct?.description || "Nothing"}
        </p>
      </section>
      <section className="p-2">
        <span className="  text-ls md:text-2xl text-green-500">Extra Rs.{discountedPrice} off</span>
        <p className=" text-ls md:text-xl">
          {" "}
          Rs.{finalPrice || "Nothing"}{" "}
          <span className="line-through  text-slate-500">
            {" "}
            Rs.{selectedProduct?.price}
          </span>{" "}
        </p>
      </section>
    </div>
  );
};

export default ProductDetails;
