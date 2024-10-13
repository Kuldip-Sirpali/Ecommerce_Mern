import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSearchProducts } from '../../../redux/productSlice';
const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/v1/store/search-product?query=${query}`);
      dispatch(getSearchProducts(response.data.data));
      setQuery("")
      navigate(`/search/${query}`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form action="#" onSubmit={handleSearch}>
      <section className='px-4 py-2  rounded-full bg-white flex items-center  gap-6' >
        <input type="search" required name="search" id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search' className='bg-transparent pl-2 outline-none' autoComplete='off' />
        <button type='submit' className='bg-green-300 text-white cursor-pointer p-1 rounded-full'>
          <FaSearch />
        </button>

      </section>
    </form>
  )
}

export default Search