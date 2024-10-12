


import React, { useEffect } from 'react'
import useGetProduct from '../../../hooks/useGetProduct'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ImageZoom from './ImageZoom';
import Button from '../../Button';
import ProductDetails from './ProductDetails';
import { addToCart } from '../../../redux/cartSlice';
const ProductView = () => {
  const { id } = useParams();
  useGetProduct(id)
  const { selectedProduct } = useSelector((state) => state.items);
  const { user } = useSelector((state => state.customer))
  console.log(selectedProduct);
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct))
  }

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }

  }, []);

  return (
    <div className='bg-blue-400 h-screen w-full flex'>
      {/* Left section containing the zoomable image */}
      <section className="w-full md:w-8/12 lg:w-4/12 h-full bg-white p-4 ">
        <div className=" h-auto w-64 md:h-80 zoom-image-main-container  p-4  flex flex-col gap-2   ">
          <ImageZoom src={selectedProduct?.image} />
          <Button onClick={handleAddToCart} className="bg-green-500" >Add to cart</Button>





        </div>
      </section>



      {/* Additional section, which you can expand */}
      <section className='w-8/12 h-full bg-gray-200 p-8'>
        <ProductDetails />
      </section>
    </div>




    // <div className='bg-blue-400 h-screen w-full'>

    //   <section className='w-4/12 h-full bg-white p-4  flex  justify-center'>
    //     <div className='w-1/2 h-80  border-2 border-black  flex items-center justify-center p-2' style={{
    //     }}>
    //       <ImageZoom src={selectedProduct?.image} />
    //     </div>

    //   </section>
    //   <section>


    //   </section>


    // </div>

  )
}

export default ProductView;