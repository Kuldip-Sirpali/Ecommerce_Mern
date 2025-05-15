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
      className="bg-gradient-to-br from-white via-[#f6fff3] to-[#e9ffd9] shadow-lg rounded-2xl border border-[#e9bbc5] hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      <div
        style={{
          backgroundImage: `url(${item?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="h-48 w-full cursor-pointer relative group"
        onClick={() => navigate(`/product/${item?._id}`)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#650102]/40 to-transparent group-hover:from-[#650102]/60 transition" />
      </div>

      <div className="flex-1 flex flex-col justify-between px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-Hmain mb-1 truncate">
            {item.title.length > 30
              ? `${item.title.slice(0, 30)}...`
              : item.title}
          </h2>
          {/* <p className="text-xs text-[#4d704d] mb-3 truncate">
            {item?.description?.slice(0, 50)}
            {item?.description?.length > 50 ? "..." : ""}
          </p> */}
        </div>
        <div className="flex items-center mb-4">
          <span className="text-main text-sm font-bold">Rs. {finalPrice}</span>
          <span className="text-sm text-gray-400 ml-2 line-through">
            Rs.{item?.price}
          </span>
          {/* <span className="ml-2 px-2 py-0.5 bg-[#d2f8c2] text-[#38b000] text-xs font-semibold rounded-full">
            -{DISCOUNT_PERCENTAGE}%
          </span> */}
        </div>
        <Button
          onClick={() => method(item)}
          className="w-full px-2 py-2 text-xs bg-main hover:bg-Hmain transition-colors text-white font-semibold rounded-full flex items-center justify-center gap-2 shadow-sm"
        >
          <FaCartArrowDown size={14} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
