import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import Button from "../../Button";
import { removeFromCart } from "../../../redux/cartSlice";
import { DISCOUNT_PERCENTAGE } from "../../../utils/constants";
import { BiSolidPurchaseTag } from "react-icons/bi";
import CartCard from "../CartCard";
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

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, []);

  return (
    <div className="text-black  min-h-screen  flex flex-col lg:flex-row lg:space-x-12 p-6">
      {/* Cart Section */}
      <section className="flex-2 w-full lg:w-2/3">
        {items?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {items?.map((item) => (
              <CartCard key={item?._id} item={item} method={handleRemoveFromCart} />
            ))}
          </div>
        ) : (
          <section className=" h-64 font-semibold mt-4 text-center  flex items-center  justify-center flex-col text-[#70e000]  ">
            {" "}
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

          <Button className="bg-[#70e000] text-white w-full py-3 rounded-md hover:bg-[#38b000] transition-colors duration-300">
            Purchase <BiSolidPurchaseTag className="inline-block ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
