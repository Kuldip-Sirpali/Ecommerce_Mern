


import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { BACKEND_URL } from './utils/constants'
import axios from 'axios'

const Container = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const refreshToken = async () => {
  //     try {
  //       axios.defaults.withCredentials = true;
  //       const response = await axios.post(
  //         `${BACKEND_URL}/api/v1/user/refresh-token`
  //       );
  //       if (response.status === 400) {
  //         navigate("/sign-in");
  //       }
  //     } catch (error) {
  //       navigate("/sign-in");
  //     }
  //   };
  //   // Refresh token every 1hr
  //   const intervalId = setInterval(
  //     refreshToken,
  //     import.meta.env.VITE_ACCESS_TOKEN_EXPIRY
  //   );

  //   // Initial refresh
  //   refreshToken();

  //   return () => clearInterval(intervalId);
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