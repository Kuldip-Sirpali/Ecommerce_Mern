// import React from "react";
// import useGetAddedProducts from "../../../hooks/useGetAddedProducts";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Button from "../../Button";
// import { removeFromCart } from "../../../redux/cartSlice";

// const Cart = () => {
//   const { items } = useSelector((state) => state.cart);
//   const navigate = useNavigate();
//   // useGetAddedProducts();
//   console.log(items);
//   const dispatch = useDispatch();

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart(id))
//   }

//   return (
//     <div className="text-black flex">

//       <section>

//         {items.length > 0 ? (
//           <div className="grid grid-cols-4 md:grid-cols-1 lg:grid-cols-1 gap-4">
//             {items.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white shadow-md rounded-lg p-2"

//               >
//                 <div
//                   onClick={() => {
//                     navigate(`/product/${item?._id}`);
//                   }}
//                   className="h-64 w-full overflow-hidden bg-green-300 flex items-center justify-center "
//                 >
//                   <img src={item?.image} alt={item?.title} />
//                 </div>
//                 <h2 className="text-lg ">{item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}</h2>
//                 <Button onClick={() => handleRemoveFromCart(item._id)} content="Remove from cart" className="bg-red-500" />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div>Nothing in the cart</div>
//         )}

//       </section>

//       <section>

//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, sunt! Hic magni quis illo. Odio nostrum voluptate deleniti sunt aliquid quibusdam dolor exercitationem ullam nisi neque, magnam, voluptatibus sequi iure, mollitia consequuntur! Quae, cum. Velit a molestias facilis. Quibusdam explicabo cum distinctio dolorem ad soluta voluptate nulla in, nesciunt sed doloribus eligendi minus perspiciatis atque neque dicta itaque tempora nihil.
//       </section>

//     </div>
//   );
// };

// export default Cart;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { BiPurchaseTag } from "react-icons/bi";
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
    // <div className="text-black flex flex-col lg:flex-row lg:space-x-8">
    //   {/* Cart Section */}
    //   <section className="flex-2">
    //     {items.length > 0 ? (
    //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4">
    //         {items.map((item) => (
    //           <div
    //             key={item._id}
    //             className="bg-white shadow-md rounded-lg p-4"
    //           >
    //             <div
    //               onClick={() => navigate(`/product/${item?._id}`)}
    //               className="h-64 w-full overflow-hidden bg-green-300 flex items-center justify-center cursor-pointer"
    //             >
    //               <img
    //                 src={item?.image}
    //                 alt={item?.title}
    //                 className="object-cover h-full w-full"
    //               />
    //             </div>
    //             <h2 className="text-lg font-semibold mt-2">
    //               {item.title.length > 20
    //                 ? `${item.title.slice(0, 20)}...`
    //                 : item.title}
    //             </h2>
    //             <Button
    //               onClick={() => handleRemoveFromCart(item._id)}
    //               className="bg-red-500 text-white mt-4 px-4 py-2 rounded-md"
    //             >
    //               Remove from cart
    //             </Button>
    //           </div>
    //         ))}
    //       </div>
    //     ) : (
    //       <div className="text-lg font-semibold mt-4">Nothing in the cart</div>
    //     )}
    //   </section>

    //   {/* Sidebar Section */}
    //   <section className="lg:w-3/4 mt-8 lg:mt-0">
    //     <div className="bg-white shadow-md rounded-lg p-4">
    //       <h2 className="text-xl font-bold">Your Cart</h2>

    //       <div>
    //         Discount:50%
    //       </div>
    //       <div>
    //         Total Quantity: {totalQuantity}
    //       </div>
    //       <div>
    //         Final Amount: Rs.{totalPrice}
    //       </div>

    //       <Button className="bg-green-500">Purchase</Button>
    //     </div>
    //   </section>
    // </div>

    <div className="text-black  min-h-screen  flex flex-col lg:flex-row lg:space-x-12 p-6">
      {/* Cart Section */}
      <section className="flex-2 w-full lg:w-2/3">
        {items.length > 0 ? (
          // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          //   {items.map((item) => (
          //     <div
          //       key={item._id}
          //       className="bg-white shadow-md rounded-lg p-4 "
          //     >
          //       <div
          //         onClick={() => navigate(`/product/${item?._id}`)}
          //         className="h-64 w-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer rounded-lg"
          //       >
          //         <img
          //           src={item?.image}
          //           alt={item?.title}
          //           className="object-cover h-full w-full rounded-md"
          //         />
          //       </div>
          //       <h2 className="text-lg font-semibold mt-4 text-gray-700">
          //         {item.title.length > 20
          //           ? `${item.title.slice(0, 20)}...`
          //           : item.title}
          //       </h2>
          //       <Button
          //         onClick={() => handleRemoveFromCart(item._id)}
          //         className="bg-red-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 w-full"
          //       >
          //         Remove from cart
          //       </Button>
          //     </div>
          //   ))}
          // </div>
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
