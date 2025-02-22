import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../Button';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../../redux/cartSlice';
import { FaCartArrowDown } from 'react-icons/fa';

const SearchPage = () => {
  const navigate = useNavigate()
  const { searchProducts } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.customer);
  const { query } = useParams();
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    dispatch(addToCart(item));
  };
  return (
    <section className='p-4 min-h-screen'>

      <p className='text-[#70e000] p-2 text-2xl'> Search results  for :

        <span className='text-3xl font-bold text-[#38b000]'>
          " {query} "

        </span></p>

      {searchProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {searchProducts.map((item) => (
            // <div
            //   key={item._id}
            //   className="bg-white shadow-md rounded-lg p-2"
            // >
            //   <div

            //     className="h-64 w-full overflow-hidden bg-green-300 flex items-center justify-center  cursor-pointer"
            //     onClick={() => {
            //       navigate(`/product/${item?._id}`);

            //     }}
            //   >
            //     <img src={item?.image} alt={item?.title} />
            //   </div>


            //   <h2 className="text-lg ">{item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}</h2>

            //   <h3 className='text-green-400'>Rs.{item.price}</h3>
            //   <Button onClick={() => handleAddToCart(item)} className="bg-[#70e000]">Add to cart</Button>
            // </div>
            // <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-200">
            //   <div

            //     style={{
            //       backgroundImage: `url(${item?.image})`,
            //       backgroundSize: "contain",
            //       backgroundPosition: "center",
            //       backgroundRepeat: "no-repeat",

            //     }}
            //     className="h-56 w-full overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer rounded-t-md"
            //     onClick={() => navigate(`/product/${item?._id}`)}
            //   >
            //     {/* <img
            //       loading="lazy"
            //       src={item?.image}
            //       alt={item?.title}
            //       className="object-cover h-full w-full rounded-t-md"
            //     /> */}
            //   </div>

            //   <div className="p-3 text-left">
            //     <h2 className="text-lg font-semibold text-gray-800 truncate">
            //       {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
            //     </h2>
            //     <h3 className="text-[#38b000] text-md font-medium mt-1">Rs. {item.price}</h3>
            //   </div>

            //   <Button
            //     onClick={() => handleAddToCart(item)}
            //     className="w-auto px-4 py-1 bg-[#70e000] hover:bg-[#38b000] transition-colors text-white font-medium rounded-md"
            //   >
            //     Add to Cart
            //   </Button>
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
                onClick={() => handleAddToCart(item)}
                className="w-full px-4 py-2 bg-[#70e000] hover:bg-[#38b000] transition-colors text-white font-medium rounded-md mt-4"
              >
                Add to Cart <FaCartArrowDown className="inline-block ml-2" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className='w-full   flex justify-center  flex-col items-center gap-4 '>
          <p className='text-3xl text-[#70e000]'> No result found.</p>
          <p className='text-xl'>Please check the query properly</p>
        </div>
      )
      }
    </section >
  )
}

export default SearchPage
