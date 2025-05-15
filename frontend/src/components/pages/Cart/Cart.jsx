import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import Button from "../../Button";
import { removeFromCart } from "../../../redux/cartSlice";
import { DISCOUNT_PERCENTAGE } from "../../../utils/constants";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { MdRemoveShoppingCart } from "react-icons/md";
import { toast } from "react-hot-toast";
const Cart = () => {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const finalTotalAmount = Math.ceil(
    ((100 - DISCOUNT_PERCENTAGE) / 100) * totalPrice
  );
  const { user } = useSelector((state) => state.customer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id, itemTitle) => {
    dispatch(removeFromCart(id));
    toast.success(`${itemTitle} - removed from cart`, {
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
    <div className="text-black min-h-screen flex flex-col lg:flex-row lg:space-x-12 sm:px-24 px-4 py-2">
      {/* Cart Section */}
      <section className="flex-2 w-full lg:w-2/3">
        {items?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {items?.map((item) => {
              const finalPrice = Math.ceil(
                ((100 - DISCOUNT_PERCENTAGE) / 100) * item?.price
              );
              return (
                <div
                  key={item?._id}
                  className="rounded-2xl bg-gradient-to-br from-white via-[#f6fff3] to-[#e9ffd9] border border-[#e9bbc5] hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#650102]/40 to-transparent group-hover:from-[#650102]/60 transition"></div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between px-5 py-4">
                    <div>
                      <h2 className="text-base font-semibold text-[#1a3c1a] mb-1 truncate">
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
                      <span className="text-main text-sm font-bold">
                        Rs. {finalPrice}
                      </span>
                      <span className="text-sm text-gray-400 ml-2 line-through">
                        Rs.{item?.price}
                      </span>
                      {/* <span className="ml-2 px-2 py-0.5 bg-[#d2f8c2] text-[#38b000] text-xs font-semibold rounded-full">
                        -{DISCOUNT_PERCENTAGE}%
                      </span> */}
                    </div>
                    <Button
                      onClick={() => handleRemoveFromCart(item?._id, item?.title)}
                      className="w-full px-2 py-2 text-xs bg-main hover:bg-Hmain transition-colors text-white font-semibold rounded-full flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MdRemoveShoppingCart />  Remove from Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <section className="h-64 font-semibold mt-4 text-center flex items-center justify-center flex-col text-main">
            <div className="text-8xl">
              <BsCart4 />
            </div>
            <div className="text-4xl font-bold">Empty cart</div>
          </section>
        )}
      </section>

      {/* Sidebar Section */}
      <section className="lg:w-1/3 mt-8 lg:mt-0 md:fixed md:right-0">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Cart Summary
          </h2>

          <div className="flex justify-between text-lg text-gray-600 mb-4">
            <span>Discount:</span>
            <span>{DISCOUNT_PERCENTAGE}%</span>
          </div>
          <div className="flex justify-between text-lg text-gray-600 mb-4">
            <span>Total Quantity:</span>
            <span>{totalQuantity}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-600 mb-4">
            <span>Final Amount:</span>
            <span>Rs. {finalTotalAmount}</span>
          </div>

          <Button className="bg-main text-white w-full py-3 rounded-md hover:bg-Hmain transition-colors duration-300">
            Purchase <BiSolidPurchaseTag className="inline-block ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
