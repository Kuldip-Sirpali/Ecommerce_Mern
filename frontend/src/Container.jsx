


import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

const Container = () => {
  // const navigate = useNavigate()
  // useEffect(() => {
  //   navigate("/");
  // }, []);
  return (
    <>
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>

  )
}

export default Container