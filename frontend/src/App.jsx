import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import Container from "./Container";
import Store from "./components/pages/Store/Store";

import Category from "./components/pages/Category/Category";
import ProductView from "./components/pages/Product/ProductView";
import Cart from "./components/pages/Cart/Cart";
import SearchPage from "./components/pages/Search/SearchPage";
import Auth from "./components/pages/User/SignIn";
import Profile from "./components/pages/User/Profile";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "./utils/constants";
import SignUp from "./components/pages/User/SignUp";
import SignIn from "./components/pages/User/SignIn";
import VerifyEmail from "./components/pages/User/VerifyEmail";
import ErrorPage from "./components/ErrorPage";
import CategoryList from "./components/pages/Category/CategoryList";

import { GoogleOAuthProvider } from "@react-oauth/google";
import OAuth from "./components/pages/User/OAuth";
const GoogleWrapper = () => (
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
  >
    <OAuth />
  </GoogleOAuthProvider>

);
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Container />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
      {

        path: "/verify-email",
        element: <VerifyEmail />
      },
      {
        path: "/sign-in",
        // element: <SignIn />,
        element: <GoogleWrapper />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/store",
        element: <Store />,
      },
      {
        path: "/category",
        element: <CategoryList />,

      },
      {
        path: "/category/:categoryName",
        element: <Category />,
      },
      {
        path: "/product/:id",
        element: <ProductView />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

function App() {

  // useEffect(() => {
  //   const refreshToken = async () => {
  //     try {
  //       axios.defaults.withCredentials = true;
  //       const response = await axios.post(
  //         `${BACKEND_URL}/api/v1/user/refresh-token`
  //       );
  //       if (response.status === 400) {
  //         window.location.href = "/sign-in";
  //       }
  //     } catch (error) {
  //       throw new Error("Failed to establish valid session");
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
      <RouterProvider router={router}>
        <Container />
     
      </RouterProvider>
    </>
  );
}

export default App;
