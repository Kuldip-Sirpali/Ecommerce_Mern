import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addToCart } from '../../../redux/cartSlice';
import ProductCard from '../../ProductCard';

const SearchPage = () => {

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query"); // Get the 'query' parameter from the URL
  const navigate = useNavigate()
  const { searchProducts } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    dispatch(addToCart(item));
  };
  return (
    <section className='p-4 min-h-screen'>

      <p className='text-[#70e000] p-2 text-2xl'> Search results  for :

        <span className='text-3xl font-bold text-[#38b000]'>
          {query}

        </span></p>

      {searchProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {searchProducts.map((item) => (
            <ProductCard key={item?._id} item={item} method={handleAddToCart} />
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
