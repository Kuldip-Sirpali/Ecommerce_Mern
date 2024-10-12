import React, { useState, useEffect } from 'react'
import axios from 'axios';
const Page = () => {

  // const [items, setItems] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [page, setPage] = useState(1);
  // const [totalItems, setTotalItems] = useState(0);
  // const fetchItems = async (page) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`/api/v1/store/get-products?page=${page}&limit=2`);
  //     setItems((prev) => {
  //       const newItems = [...prev, ...response.data.items];
  //       // Filter out duplicates based on a unique property (like _id)
  //       const uniqueItems = Array.from(new Set(newItems.map(item => item._id))).map(id => {
  //         return newItems.find(item => item._id === id);
  //       });
  //       return uniqueItems;
  //     });
  //     setTotalItems(response.data.totalItems);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchItems(page);
  // }, [page]);




  ///******* */
  // const debounce = (func, delay) => {
  //   let timeout;
  //   return (...args) => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       func(...args);
  //     }, delay);
  //   };
  // };

  // // Use it in your scroll handler
  // const handleScroll = debounce(() => {
  //   if (loading || items.length >= totalItems) return;

  //   if (
  //     window.innerHeight + document.documentElement.scrollTop + 1 >=
  //     document.documentElement.offsetHeight
  //   ) {
  //     setPage((prev) => prev + 1);
  //   }
  // }, 200);


  //****** */









  // const handleScroll = () => {
  //   if (loading || items.length >= totalItems) return;

  //   if (
  //     window.innerHeight + document.documentElement.scrollTop + 1 >=
  //     document.documentElement.offsetHeight
  //   ) {
  //     setPage((prev) => prev + 1); // Increment page to fetch more items
  //   }
  // };



  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [loading, items, totalItems]);




  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/store/get-products?page=${page}&limit=3`);
      setProducts((prev) => {
        const newItems = [...prev, ...response.data.data];
        // Filter out duplicates based on a unique property (like _id)
        const uniqueItems = Array.from(new Set(newItems.map(item => item._id))).map(id => {
          return newItems.find(item => item._id === id);
        });
    
        return uniqueItems;
      });
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [page])

  const handleScroll = async () => {
    try {

      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.offsetHeight
      ) {
        setLoading(true)
        setPage((prev) => prev + 1)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  return (
    <div className=" container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <img src={item.image} alt="" />
            <p className="text-gray-700">{item.description}</p> {/* Adjust based on your item structure */}
            <p>{item.createdAt}</p>
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center my-4">
          <svg
            className="animate-spin h-5 w-5 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" strokeWidth="4" stroke="currentColor" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z" />
          </svg>
        </div>
      )}
    </div>



  )
}



export default Page