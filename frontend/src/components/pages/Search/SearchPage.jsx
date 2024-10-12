



import React from 'react'
import { useSelector } from 'react-redux'
import { DISCOUNT_PERCENTAGE } from '../../../utils/constants';
import Button from '../../Button';
import { useNavigate, useParams } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate()
  const { searchProducts } = useSelector((state) => state.items);
  const { query } = useParams()
  return (
    <section className='p-4 min-h-screen'>

      <p className='text-green-400 p-2 text-2xl'> Search results  for : {query}</p>

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

              <h3 className='text-green-400'>Rs.{item.price}{DISCOUNT_PERCENTAGE}</h3>
              <Button onClick={() => handleAddToCart(item)} className="bg-green-500">Add to cart</Button>
            </div>
          ))}
        </div>
      ) : (
        <div className='w-full   flex justify-center  flex-col items-center gap-4 '>
          <p className='text-3xl text-green-500'> No result found.</p>
          <p className='text-xl'>Please check the query properly</p>
        </div>
      )
      }
    </section >
  )
}

export default SearchPage