import React from "react";
import { useSelector } from "react-redux";
import { DISCOUNT_PERCENTAGE } from "../../../utils/constants";
const ProductDetails = () => {
  const { selectedProduct } = useSelector((state) => state.items);

  const finalPrice = Math.round(((100 - DISCOUNT_PERCENTAGE) / 100) * selectedProduct?.price);
  const discountedPrice = selectedProduct?.price - finalPrice;
  return (
    // <div>
    //   <section className="p-2">
    //     <h1 className="font-bold text-xl md:text-3xl">
    //       {selectedProduct?.title || "Nothing"}
    //     </h1>
    //   </section>
    //   <section className="p-2">
    //     <p className=" text-ls md:text-xl">
    //       {selectedProduct?.description || "Nothing"}
    //     </p>
    //   </section>
    //   <section className="p-2">
    //     <span className="  text-ls md:text-2xl text-green-500">Extra Rs.{discountedPrice} off</span>
    //     <p className=" text-ls md:text-xl">
    //       {" "}
    //       Rs.{finalPrice || "Nothing"}{" "}
    //       <span className="line-through  text-slate-500">
    //         {" "}
    //         Rs.{selectedProduct?.price}
    //       </span>{" "}
    //     </p>
    //   </section>
    // </div>
    <div className="bg-white shadow-md rounded-lg p-4 space-y-4 border border-gray-200">
      <section className="p-2">
        <h1 className="font-bold text-xl md:text-3xl text-gray-800">
          {selectedProduct?.title || "Nothing"}
        </h1>
      </section>

      <section className="p-2">
        <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
          {selectedProduct?.description || "Nothing"}
        </p>
      </section>

      <section className="p-2 bg-green-50 border-l-4 border-[#38b000] rounded-md">
        <span className="text-md md:text-2xl text-[#38b000] font-semibold">
          Extra Rs.{discountedPrice} OFF
        </span>
      </section>

      <section className="p-2">
        <p className="text-lg md:text-2xl font-bold text-gray-800">
          Rs.{finalPrice || "Nothing"}
          <span className="line-through text-slate-500 text-lg font-normal ml-2">
            Rs.{selectedProduct?.price}
          </span>
        </p>
      </section>
    </div>

  );
};

export default ProductDetails;
