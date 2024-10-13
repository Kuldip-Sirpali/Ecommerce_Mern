import React from 'react'
import Slideshow from './SlideShow';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DISCOUNT_PERCENTAGE } from '../../../utils/constants';
import Button from '../../Button';
import { addToCart } from '../../../redux/cartSlice';
const Home = () => {
  const { products } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.customer)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleAddToCart = (item) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    dispatch(addToCart(item))
  }
  return (
    <>

      <section >
        <Slideshow />
      </section>
      <section>
        <div className=" container mx-auto px-4 py-8">
          <h1 className="text-2xl  mb-4">Overview Products</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products && products.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-2"
              >
                <div

                  className="h-64 w-full overflow-hidden bg-white border-2 border-[#80ed99 ]flex items-center justify-center  cursor-pointer"
                  onClick={() => {
                    navigate(`/product/${item?._id}`);

                  }}
                >
                  <img src={item?.image} alt={item?.title} />
                </div>


                <h2 className="text-lg ">{item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}</h2>

                <h3 className='text-green-400 text-sm'>Rs.{item.price}{DISCOUNT_PERCENTAGE}</h3>
                <Button onClick={() => handleAddToCart(item)} className="bg-[#38a3a5]">Add to cart</Button>
              </div>
            ))}
          </div>

        </div>



      </section>
    </>
  );
};

export default Home;
