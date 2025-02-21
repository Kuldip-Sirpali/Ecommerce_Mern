import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../Button';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../../redux/cartSlice';

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

        <span className='text-3xl text-[#38b000]'>
          {query}

        </span></p>

      {searchProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {searchProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg p-2"
            >
              <div

                className="h-64 w-full overflow-hidden bg-green-300 flex items-center justify-center  cursor-pointer"
                onClick={() => {
                  navigate(`/product/${item?._id}`);

                }}
              >
                <img src={item?.image} alt={item?.title} />
              </div>


              <h2 className="text-lg ">{item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}</h2>

              <h3 className='text-green-400'>Rs.{item.price}</h3>
              <Button onClick={() => handleAddToCart(item)} className="bg-[#70e000]">Add to cart</Button>
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
