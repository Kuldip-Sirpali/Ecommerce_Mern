import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { DISCOUNT_PERCENTAGE } from "../utils/constants";
const ProductCard = ({ item, method }) => {
  const navigate = useNavigate();

  const finalPrice = Math.round(
    ((100 - DISCOUNT_PERCENTAGE) / 100) * item?.price
  );

  return (
    <div
      key={item?._id}
      className="bg-white shadow-lg rounded-lg p-2  transform border border-[#80d459] transition-all  duration-1000 "
    >
      <div
        style={{
          backgroundImage: `url(${item?.image})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="h-36 w-full overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer rounded-t-md group relative"
        onClick={() => navigate(`/product/${item?._id}`)}
      ></div>

      <div className="p-1 text-left">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {item.title.length > 20
            ? `${item.title.slice(0, 20)}...`
            : item.title}
        </h2>
        <span className="text-[#38b000] text-lg  mt-1">Rs. {finalPrice}</span>

        <span className="text-md text-gray-500 ml-2 line-through">
          Rs.{item?.price}
        </span>
      </div>

      <Button
        onClick={() => method(item)}
        className="w-full px-4 py-2 bg-[#70e000] hover:bg-[#38b000] transition-colors text-white font-medium rounded-md mt-4"
      >


        Add to Cart <FaCartArrowDown className="inline-block ml-2" />
      </Button>
    </div>
  );
};

export default ProductCard;
