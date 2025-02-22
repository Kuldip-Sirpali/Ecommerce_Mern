

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import Button from "../../Button";
import { removeFromCart } from "../../../redux/cartSlice";
import { DISCOUNT_PERCENTAGE } from "../../../utils/constants";
import { MdRemoveShoppingCart } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
const Cart = () => {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const finalTotalAmount = Math.ceil((100 - DISCOUNT_PERCENTAGE) / 100 * totalPrice);
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
              // <div
              //   key={item._id}
              //   className="bg-white shadow-md rounded-lg p-2"

              // >
              //   <div
              //     onClick={() => {
              //       navigate(`/product/${item?._id}`);
              //     }}
              //     className="h-64 w-full overflow-hidden flex items-center justify-center "
              //   >
              //     <img src={item?.image} alt={item?.title} />
              //   </div>
              //   <h2 className="text-lg ">{item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}</h2>
              //   <Button onClick={() => handleRemoveFromCart(item?._id)} className="bg-red-600" >Remove from cart</Button>
              // </div>

              <div className="bg-white shadow-lg rounded-lg p-4   transform border border-[#80d459] transition-all duration-300">
                <div
                  style={{
                    backgroundImage: `url(${item?.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="h-56 w-full overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer rounded-t-md group relative"
                  onClick={() => navigate(`/product/${item?._id}`)}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                  </div>
                </div>

                <div className="p-3 text-left">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                  </h2>
                  <h3 className="text-[#38b000] text-md font-medium mt-1">
                    Rs. {item.price}
                  </h3>
                </div>

                <Button
                  onClick={() => handleRemoveFromCart(item?._id)}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-900 transition-colors text-white font-medium rounded-md mt-4"
                >
                  Remove from cart <MdRemoveShoppingCart className="inline-block ml-2" />
                </Button>
              </div>
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
