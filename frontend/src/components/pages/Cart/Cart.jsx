

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import Button from "../../Button";
import { removeFromCart } from "../../../redux/cartSlice";
import { DISCOUNT_PERCENTAGE } from "../../../utils/constants";
const Cart = () => {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.customer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (!user) {

      navigate("/auth")
    }


  }, [])

  return (

    <div className="text-black  min-h-screen  flex flex-col lg:flex-row lg:space-x-12 p-6">
      {/* Cart Section */}
      <section className="flex-2 w-full lg:w-2/3">
        {items.length > 0 ? (
    
        
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-2"

              >
                <div
                  onClick={() => {
                    navigate(`/product/${item?._id}`);
                  }}
                  className="h-64 w-full overflow-hidden bg-green-300 flex items-center justify-center "
                >
                  <img src={item?.image} alt={item?.title} />
                </div>
                <h2 className="text-lg ">{item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}</h2>
                <Button onClick={() => handleRemoveFromCart(item?._id)} className="bg-red-400" >Add to cart</Button>
              </div>
            ))}
          </div>
        ) : (
          <section className=" h-64 font-semibold mt-4 text-center  flex items-center  justify-center flex-col text-green-400  ">
            {" "}
            <div className="text-8xl">
              <BsCart4 />
            </div>
            <div className="text-4xl font-bold">Empty cart</div>
          </section>
        )}
      </section>

      {/* Sidebar Section */}
      <section className="lg:w-1/3 mt-8 lg:mt-0">
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
            <span>Rs. {totalPrice}</span>
          </div>

          <Button className="bg-green-500 text-white w-full py-3 rounded-md hover:bg-green-600 transition-colors duration-300">
            Purchase
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
